import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
});

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
      filter: {
        property: 'slug',
        rich_text: {
          equals: id,
        },
      },
    });
    const posts = response.results;

    if (posts.length <= 0) {
      return NextResponse.json(
        { error: 'Not found.' },
        {
          status: 404,
        }
      );
    }

    const post = posts[0] as any;
    const status = post.properties.status.status.name;

    // 記事詳細でも公開していない記事は見れないようにする
    if (status !== 'published') {
      return NextResponse.json(
        { error: 'Not found.' },
        {
          status: 404,
        }
      );
    }

    const title = post.properties.title.title[0]?.plain_text;
    const publishedAt = post.properties.published_at.date.start;
    const emoji = post.icon?.type === 'emoji' ? post.icon.emoji : '📝';
    const contentTypes = post.properties.content_type.multi_select.map(
      (item: any) => item.name
    );

    const markdown = (await n2m.pageToMarkdown(post.id, 2))
      .filter((mdblock) => mdblock.parent !== '')[0]
      .parent.replace(/^```markdown\n?|\n?```$/g, '');

    return NextResponse.json({
      title,
      publishedAt,
      emoji,
      contentTypes,
      markdown,
    });
  } catch (_err) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
};
