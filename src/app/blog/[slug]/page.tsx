import { format } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Chip } from '@/components/Chip';
import { MermaidComponent } from '@/components/MermaidComponent';
import styles from './page.module.css';
import '@/styles/githubMarkdown.css';
import { ShareButtons } from '@/components/ShareButtons';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const blogContent = await res.json();

  const description =
    blogContent.markdown.length > 100
      ? `${blogContent.markdown.slice(0, 100).replace(/\n/g, '')}...`
      : blogContent.markdown.replace(/\n/g, '');

  return {
    title: blogContent.title,
    description,
  };
};

// 常に動的レンダリングを強制する これをいれないとbuildでこけるため
export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 60分キャッシュ
      next: { revalidate: 60 * 60 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const blogContent = await res.json();

  return (
    <div className={styles['blog-detail-page']}>
      <main className={styles.main}>
        <h1 className={styles.title}>{blogContent.title}</h1>
        <p className={styles.date}>
          {format(new Date(blogContent.publishedAt), 'yyyy/MM/dd')} 公開
        </p>
        {
          <div className="markdown-body">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                ol: ({ node, ...props }) => (
                  <ol className={styles.ol} {...props} />
                ),
                li: ({ node, ...props }) => <li {...props} />,
                // ブログ記事内のaタグは全て別タブ遷移にする
                a: ({ node, ...props }) => <a target="_blank" {...props} />,
                code: ({
                  className,
                  children,
                  ...props
                }: {
                  className?: string;
                  children?: React.ReactNode;
                } & React.HTMLAttributes<HTMLElement>) => {
                  const language = className?.split('-')?.at(-1);

                  if (!language) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }

                  if (language === 'mermaid') {
                    return <MermaidComponent chart={String(children).trim()} />;
                  }

                  if (language === 'codepen') {
                    try {
                      const url = String(children).trim();
                      const penIdMatch = url.match(/\/pen\/([^/?#]+)/);
                      const userMatch = url.match(/codepen\.io\/([^/]+)/);

                      if (!penIdMatch?.[1] || !userMatch?.[1]) {
                        throw new Error('Invalid CodePen URL format');
                      }

                      const penId = penIdMatch[1];
                      const user = userMatch[1];

                      return (
                        <iframe
                          className={styles['codepen-embed']}
                          title="CodePen Embed"
                          src={`https://codepen.io/${user}/embed/${penId}?default-tab=html,result`}
                          loading="lazy"
                          allowFullScreen
                        />
                      );
                    } catch (error) {
                      console.error('Failed to embed CodePen:', error);
                      return (
                        <p>
                          CodePen の埋め込みに失敗しました。URL
                          を確認してください。
                        </p>
                      );
                    }
                  }

                  return (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={language}
                      PreTag="div"
                    >
                      {String(children)}
                    </SyntaxHighlighter>
                  );
                },
              }}
            >
              {blogContent.markdown.replace(/\n/g, '  \n')}
            </Markdown>
          </div>
        }
        {blogContent.contentTypes && blogContent.contentTypes.length > 0 && (
          <div className={styles.contentTypes}>
            {blogContent.contentTypes.map((text: string) => (
              <Chip text={text} key={text} />
            ))}
          </div>
        )}
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`}
          title={blogContent.title}
        />
      </main>
    </div>
  );
}
