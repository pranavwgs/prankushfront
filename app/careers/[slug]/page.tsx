import {notFound} from 'next/navigation'
import {RichText} from '@/components/rich-text'
import {JOB_BY_SLUG_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type JobDetail = {
  title?: string
  employmentType?: string
  location?: string
  isRemote?: boolean
  summary?: string
  description?: unknown
  postedAt?: string
}

export default async function JobDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const job = await sanityFetch<JobDetail | null>(JOB_BY_SLUG_QUERY, {slug})

  if (!job) notFound()

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
        {job.employmentType} • {job.location} {job.isRemote ? '• Remote' : ''}
      </p>
      <h1 className="mt-2 font-[var(--font-display)] text-4xl text-slate-900">{job.title}</h1>
      <p className="mt-4 text-base leading-8 text-slate-600">{job.summary}</p>
      <div className="mt-6 border-t border-slate-100 pt-6">
        <RichText value={job.description} />
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.12em] text-slate-500">
        Posted {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'}
      </p>
    </article>
  )
}
