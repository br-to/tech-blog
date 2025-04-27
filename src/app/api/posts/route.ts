import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

// TODO: 型ちゃんとする
// type Post = {
// 	id: string;
// 	properties: {
// 		// content_type: { multi_select: string[] };
// 		// main_image: { files: string[] };
// 		// url: { rich_text: string[] };
// 		// status: { status: [Object] };
// 		published_at: {
// 			date: {
// 				start: string;
// 			};
// 		};
// 		title: {
// 			id: "title";
// 			type: "title";
// 			title: [
// 				{
// 					plain_text: string;
// 				},
// 			];
// 		};
// 	};
// };

export const GET = async (request: Request) => {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category") || "";

		const filterObject =
			category === "all"
				? {
						property: "status",
						status: {
							equals: "published",
						},
					}
				: {
						and: [
							{
								property: "status",
								status: {
									equals: "published",
								},
							},
							{
								property: "content_type",
								multi_select: {
									contains: category,
								},
							},
						],
					};
		const response = await notion.databases.query({
			database_id: process.env.NOTION_DATABASE_ID as string,
			sorts: [
				{
					// 公開日の降順に並び替える
					property: "published_at",
					direction: "descending",
				},
			],
			filter: filterObject,
		});
		const posts = response.results;

		// PageObjectResponse型のみ通す型ガード
		function isPageObjectResponse(post: unknown): post is PageObjectResponse {
			return (
				typeof post === "object" &&
				post !== null &&
				"object" === typeof post &&
				"properties" in post
			);
		}

		const postsProperties = posts
			.filter(isPageObjectResponse)
			.map((p) => {
				const id = p.id;
				const title =
					p.properties.title.type === "title"
						? p.properties.title.title[0]?.plain_text
						: undefined;
				const slug =
					p.properties.slug.type === "rich_text"
						? p.properties.slug.rich_text[0]?.plain_text
						: undefined;
				const publishedAt =
					p.properties.published_at.type === "date"
						? p.properties.published_at.date?.start
						: undefined;
				const contentTypes =
					p.properties.content_type.type === "multi_select"
						? p.properties.content_type.multi_select.map((item) => item.name)
						: [];
				const mainImage =
					p.properties.main_image.type === "files"
						? (() => {
							const fileObj = p.properties.main_image.files[0];
							if (!fileObj) return undefined;
							if ("external" in fileObj) {
								return fileObj.external.url;
							} else if ("file" in fileObj) {
								return fileObj.file.url;
							}
							return undefined;
						})()
						: undefined;
				return { id, title, slug, publishedAt, contentTypes, mainImage };
			});

		if (postsProperties.length <= 0) {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		return NextResponse.json(postsProperties);
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
};
