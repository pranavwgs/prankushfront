import Link from 'next/link'
import {CmsImage} from '@/components/cms-image'
import {BLOG_POSTS_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type BlogPostCard = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: unknown
  publishedAt?: string
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPostCard[]>(BLOG_POSTS_QUERY)

  return (
    <section>
      <h1 className="font-[var(--font-display)] text-4xl text-slate-900">Blog</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Fresh thinking on growth strategy, creative systems, and performance marketing.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <CmsImage image={post.coverImage} alt={post.title} width={1000} height={620} className="h-52 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#0b6efd] hover:text-[#095ad0]">
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
