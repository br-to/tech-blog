import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

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

export const GET = async (
	_: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	try {
		const { id } = await params;
		const response = await notion.databases.query({
			database_id: process.env.NOTION_DATABASE_ID as string,
			filter: {
				property: "slug",
				rich_text: {
					equals: id,
				},
			},
		});
		const posts = response.results;

		if (posts.length <= 0) {
			return NextResponse.json(
				{ error: "Not found." },
				{
					status: 404,
				},
			);
		}

		const post = posts[0] as any;
		const title = post.properties.title.title[0]?.plain_text;

		const mdblocks = (await n2m.pageToMarkdown(post.id, 2)).filter(
			(mdblock) => mdblock.parent !== "",
		);

		return NextResponse.json({ title, mdblocks });
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
};
