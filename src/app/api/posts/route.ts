import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

type NotionPost = PageObjectResponse & {
	properties: {
		title: {
			type: "title";
			title: Array<{
				type: "text";
				text: { content: string };
				plain_text: string;
			}>;
		};
		slug: {
			type: "rich_text";
			rich_text: Array<{
				type: "text";
				text: { content: string };
				plain_text: string;
			}>;
		};
		published_at: {
			type: "date";
			date: {
				start: string;
				end: string | null;
			};
		};
		content_type: {
			type: "multi_select";
			multi_select: Array<{
				name: string;
			}>;
		};
		main_image: {
			type: "files";
			files: Array<{
				type: "external";
				name: string;
				external: {
					url: string;
				};
			}>;
		};
		status: {
			type: "status";
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
		const paginated = searchParams.get("paginated");
		const pageParam = searchParams.get("page");
		const pageSizeParam = searchParams.get("pageSize");
		const page = Math.max(1, Number(pageParam) || 1);
		const pageSize = Math.min(50, Math.max(1, Number(pageSizeParam) || 12));

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
		// 全件をカーソルで集約（Notion は total を返さないため）
		const allResults: NotionPost[] = [];
		let cursor: string | undefined = undefined;
		do {
			const resp = await notion.databases.query({
				database_id: process.env.NOTION_DATABASE_ID as string,
				sorts: [
					{
						property: "published_at",
						direction: "descending",
					},
				],
				filter: filterObject,
				page_size: 100,
				start_cursor: cursor,
			});
			allResults.push(...(resp.results as NotionPost[]));
			cursor = resp.has_more
				? (resp.next_cursor as string | undefined)
				: undefined;
		} while (cursor);

		const posts = allResults;

		const postsProperties: BlogPost[] = posts.map((post) => ({
			id: post.id,
			title: post.properties.title.title[0]?.plain_text || "",
			slug: post.properties.slug.rich_text[0]?.plain_text || "",
			publishedAt: post.properties.published_at.date.start,
			contentTypes: post.properties.content_type.multi_select.map(
				(item) => item.name,
			),
			mainImage: post.properties.main_image.files[0]?.external.url || "",
		}));

		if (postsProperties.length <= 0) {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		// paginated=1 もしくは page/pageSize が指定された場合はページネーション形式を返す
		if (
			paginated === "1" ||
			searchParams.has("page") ||
			searchParams.has("pageSize")
		) {
			const total = postsProperties.length;
			const totalPages = Math.max(1, Math.ceil(total / pageSize));
			const safePage = Math.min(page, totalPages);
			const start = (safePage - 1) * pageSize;
			const end = start + pageSize;
			const items = postsProperties.slice(start, end);
			return NextResponse.json({
				items,
				total,
				page: safePage,
				pageSize,
				totalPages,
			});
		}

		return NextResponse.json(postsProperties);
	} catch (_err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
};
