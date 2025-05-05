import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

type NotionPost = {
	id: string;
	properties: {
		title: {
			title: [
				{
					plain_text: string;
				},
			];
		};
		slug: {
			rich_text: [
				{
					plain_text: string;
				},
			];
		};
		published_at: {
			date: {
				start: string;
			};
		};
		content_type: {
			multi_select: Array<{
				name: string;
			}>;
		};
		main_image: {
			files: Array<{
				external: {
					url: string;
				};
			}>;
		};
		status: {
			status: {
				name: string;
			};
		};
	};
};

type BlogPost = {
	id: string;
	title: string;
	slug: string;
	publishedAt: string;
	contentTypes: string[];
	mainImage: string;
};

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
					property: "published_at",
					direction: "descending",
				},
			],
			filter: filterObject,
		});
		const posts = response.results as NotionPost[];

		const postsProperties: BlogPost[] = posts.map((post) => ({
			id: post.id,
			title: post.properties.title.title[0]?.plain_text || "",
			slug: post.properties.slug.rich_text[0]?.plain_text || "",
			publishedAt: post.properties.published_at.date.start,
			contentTypes: post.properties.content_type.multi_select.map((item) => item.name),
			mainImage: post.properties.main_image.files[0]?.external.url || "",
		}));

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