import {notFound} from 'next/navigation'
import {CmsImage} from '@/components/cms-image'
import {RichText} from '@/components/rich-text'
import {BLOG_POST_BY_SLUG_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type BlogPostDetail = {
  title?: string
  excerpt?: string
  coverImage?: unknown
  publishedAt?: string
  body?: unknown
}

export default async function BlogDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await sanityFetch<BlogPostDetail | null>(BLOG_POST_BY_SLUG_QUERY, {slug})

  if (!post) notFound()

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
      </p>
      <h1 className="mt-2 font-[var(--font-display)] text-4xl text-slate-900">{post.title}</h1>
      <p className="mt-4 text-base leading-8 text-slate-600">{post.excerpt}</p>
      <div className="mt-8">
        <CmsImage image={post.coverImage} alt={post.title || 'Blog image'} width={1200} height={700} className="w-full rounded-2xl border border-slate-200 object-cover" />
      </div>
      <div className="mt-6 border-t border-slate-100 pt-6">
        <RichText value={post.body} />
      </div>
    </article>
  )
}
