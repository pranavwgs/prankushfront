import {CmsImage} from '@/components/cms-image'
import {RichText} from '@/components/rich-text'
import {ABOUT_PAGE_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type AboutData = {
  team?: Array<{
    _id: string
    fullName: string
    role: string
    photo?: unknown
    bio?: unknown
    isLeadership?: boolean
  }>
  testimonials?: Array<{
    _id: string
    clientName: string
    clientRole?: string
    quote: string
    rating?: number
  }>
}

export default async function AboutPage() {
  const data = await sanityFetch<AboutData>(ABOUT_PAGE_QUERY)

  return (
    <section className="space-y-12">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
        <h1 className="font-[var(--font-display)] text-4xl text-slate-900">About Star Agency</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          We are a strategy-led team helping modern brands connect narrative, design, and growth execution.
        </p>
      </header>

      <section>
        <h2 className="font-[var(--font-display)] text-3xl text-slate-900">Team</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {(data.team || []).map((member) => (
            <article key={member._id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-4">
                <CmsImage image={member.photo} alt={member.fullName} width={160} height={160} className="h-20 w-20 rounded-full object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{member.fullName}</h3>
                  <p className="text-sm text-slate-500">{member.role}</p>
                  {member.isLeadership ? (
                    <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                      Leadership
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-4">
                <RichText value={member.bio} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-[var(--font-display)] text-3xl text-slate-900">Testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(data.testimonials || []).map((testimonial) => (
            <article key={testimonial._id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm leading-7 text-slate-700">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{testimonial.clientName}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{testimonial.clientRole}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
