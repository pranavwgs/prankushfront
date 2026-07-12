import Link from 'next/link'
import {CAREERS_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type CareersData = {
  careerPage?: {
    headline?: string
    intro?: string
    benefits?: string[]
    applicationEmail?: string
  }
  jobs?: Array<{
    _id: string
    title: string
    slug: string
    employmentType: string
    location: string
    isRemote?: boolean
    summary?: string
    postedAt?: string
  }>
}

export default async function CareersPage() {
  const data = await sanityFetch<CareersData>(CAREERS_QUERY)

  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
        <h1 className="font-[var(--font-display)] text-4xl text-slate-900">{data.careerPage?.headline || 'Careers'}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{data.careerPage?.intro}</p>

        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {(data.careerPage?.benefits || []).map((benefit) => (
            <div key={benefit} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {benefit}
            </div>
          ))}
        </div>

        {data.careerPage?.applicationEmail ? (
          <a href={`mailto:${data.careerPage.applicationEmail}`} className="mt-7 inline-flex rounded-full bg-[#0b6efd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#095ad0]">
            Apply by Email
          </a>
        ) : null}
      </div>

      <div className="grid gap-5">
        {(data.jobs || []).map((job) => (
          <article key={job._id} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
              <span>{job.employmentType}</span>
              <span>•</span>
              <span>{job.location}</span>
              {job.isRemote ? (
                <>
                  <span>•</span>
                  <span>Remote</span>
                </>
              ) : null}
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{job.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{job.summary}</p>
            <Link href={`/careers/${job.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#0b6efd] hover:text-[#095ad0]">
              View role
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
