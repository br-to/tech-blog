import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({
	notionClient: notion,
});

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
		const status = post.properties.status.status.name;

		// 記事詳細でも公開していない記事は見れないようにする
		if (status !== "published") {
			return NextResponse.json(
				{ error: "Not found." },
				{
					status: 404,
				},
			);
		}

		const title = post.properties.title.title[0]?.plain_text;
		const publishedAt = post.properties.published_at.date.start;
		const mainImage = post.properties.main_image.files[0]?.file.url;
		const contentTypes = post.properties.content_type.multi_select.map(
			(item: any) => item.name,
		);

		// 🔥 100件以上のすべてのブロックを取得する関数
		const fetchAllBlocks = async (blockId: string): Promise<any[]> => {
			let blocks: any[] = [];
			let cursor: string | undefined = undefined;

			do {
				const response = await notion.blocks.children.list({
					block_id: blockId,
					page_size: 100,
					start_cursor: cursor, // 次のページを取得
				});

				blocks = blocks.concat(response.results);
				cursor = response.next_cursor as string; // 次のページのカーソル
			} while (cursor); // `next_cursor` が null になるまで繰り返す

			return blocks;
		};

		const fetchMarkdown = async (blockId: string): Promise<string[]> => {
			const blocks = await fetchAllBlocks(blockId);
			const mdBlocks = await Promise.all(
				blocks.map(async (block) => n2m.blockToMarkdown(block)),
			);
			return mdBlocks.filter((block) => block !== "");
		};

		const mdblocks = await fetchMarkdown(post.id);

		return NextResponse.json({
			title,
			publishedAt,
			mainImage,
			contentTypes,
			mdblocks,
		});
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
};
