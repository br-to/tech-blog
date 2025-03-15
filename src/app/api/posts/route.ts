import { Client } from "@notionhq/client";
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
		const postsProperties = posts.map((post: any) => {
			const id = post.id;
			const title = post.properties.title.title[0]?.plain_text;
			const slug = post.properties.slug.rich_text[0]?.plain_text;
			const publishedAt = post.properties.published_at.date.start;
			const contentTypes = post.properties.content_type.multi_select.map(
				(item: any) => item.name,
			);
			const mainImage = post.properties.main_image.files[0]?.file.url;

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
