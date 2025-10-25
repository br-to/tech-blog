import { BlogCard, type BlogPost } from '@/components/BlogCard';
import { Pagination } from '@/components/Pagination';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog | br-to.dev',
  description: "Kobara Toi's technical blog posts.",
};

// 常に動的レンダリングを強制する これをいれないとbuildでこけるため
export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage = Math.max(
    1,
    Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1
  );
  const PAGE_SIZE = 12;

  type PaginatedResponse = {
    items: BlogPost[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?category=all&paginated=1&page=${currentPage}&pageSize=${PAGE_SIZE}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 60分キャッシュ
      next: { revalidate: 60 * 60 },
    }
  );

  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data: PaginatedResponse = await res.json();
  const pageItems = data.items;
  const totalPages = data.totalPages;
  const safePage = data.page;

  return (
    <div className={styles['blog-page']}>
      <main className={styles.main}>
        <h1 className={styles.title}>All Posts</h1>
        <div className={styles.grid}>
          {pageItems.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </main>
    </div>
  );
}
