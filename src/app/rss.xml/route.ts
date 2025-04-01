import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const getArticles = async () => {
	const filterObject = {
		property: "status",
		status: {
			equals: "published",
		},
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
		const title = post.properties.title.title[0]?.plain_text;
		const summary = post.properties.summary.rich_text[0]?.plain_text;
		const slug = post.properties.slug.rich_text[0]?.plain_text;
		const publishedAt = post.properties.published_at.date.start;

		return { title, slug, publishedAt, summary };
	});

	return postsProperties;
};

export async function GET() {
	const articles = await getArticles();

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>br-to DevLog</title>
    <link>${process.env.NEXT_PUBLIC_BASE_URL}</link>
    <description>This blog is br-to's devlog.</description>
		<atom:link href="${process.env.NEXT_PUBLIC_BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
		<language>ja</language>
    ${articles
			.map(
				({ title, slug, publishedAt, summary }) => `
    <item>
      <title>${title}</title>
      <link>${process.env.NEXT_PUBLIC_BASE_URL}/${slug}</link>
			<guid isPermaLink="true">${process.env.NEXT_PUBLIC_BASE_URL}/${slug}</guid>
      <description>${summary}</description>
      <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
    </item>`,
			)
			.join("")}
  </channel>
</rss>`;

	return new NextResponse(rss, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
