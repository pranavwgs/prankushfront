import {notFound} from 'next/navigation'
import {RichText} from '@/components/rich-text'
import {SERVICE_BY_SLUG_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type ServiceDetail = {
  name?: string
  summary?: string
  icon?: string
  details?: unknown
}

export default async function ServiceDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const service = await sanityFetch<ServiceDetail | null>(SERVICE_BY_SLUG_QUERY, {slug})

  if (!service) notFound()

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{service.icon || 'service'}</p>
      <h1 className="mt-2 font-[var(--font-display)] text-4xl text-slate-900">{service.name}</h1>
      <p className="mt-4 text-base leading-8 text-slate-600">{service.summary}</p>
      <div className="mt-6 border-t border-slate-100 pt-6">
        <RichText value={service.details} />
      </div>
    </article>
  )
}
