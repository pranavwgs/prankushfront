import {notFound} from 'next/navigation'
import {CmsImage} from '@/components/cms-image'
import {RichText} from '@/components/rich-text'
import {PROJECT_BY_SLUG_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type ProjectDetail = {
  title?: string
  clientName?: string
  featuredImage?: unknown
  gallery?: unknown[]
  resultSummary?: string
  body?: unknown
}

export default async function ProjectDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const project = await sanityFetch<ProjectDetail | null>(PROJECT_BY_SLUG_QUERY, {slug})

  if (!project) notFound()

  return (
    <article className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
        <h1 className="font-[var(--font-display)] text-4xl text-slate-900">{project.title}</h1>
        <p className="mt-2 text-sm uppercase tracking-[0.12em] text-slate-500">{project.clientName}</p>
        <p className="mt-4 text-base leading-8 text-slate-600">{project.resultSummary}</p>
      </div>

      <CmsImage image={project.featuredImage} alt={project.title || 'Project image'} width={1400} height={840} className="w-full rounded-3xl border border-slate-200 object-cover" />

      <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
        <h2 className="text-xl font-semibold text-slate-900">Case Study</h2>
        <RichText value={project.body} />
      </section>
    </article>
  )
}
