import Link from 'next/link'
import {RichText} from '@/components/rich-text'
import {SERVICES_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type ServiceCard = {
  _id: string
  name: string
  slug: string
  summary?: string
  icon?: string
  details?: unknown
}

export default async function ServicesPage() {
  const services = await sanityFetch<ServiceCard[]>(SERVICES_QUERY)

  return (
    <section>
      <h1 className="font-[var(--font-display)] text-4xl text-slate-900">Services</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Explore our full suite of strategic, creative, and performance capabilities.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article key={service._id} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{service.icon || 'service'}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{service.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <RichText value={service.details} />
            </div>
            <Link href={`/services/${service.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#0b6efd] hover:text-[#095ad0]">
              View service
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
