import {CONTACT_PAGE_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type ContactData = {
  contact?: {
    email?: string
    phone?: string
    whatsapp?: string
    address?: string
    officeHours?: string[]
    mapEmbedUrl?: string
    socialLinks?: Array<{_key?: string; platform: string; url: string}>
  }
  faqs?: Array<{_id: string; question: string; answer: string; category?: string}>
}

export default async function ContactPage() {
  const data = await sanityFetch<ContactData>(CONTACT_PAGE_QUERY)

  return (
    <section className="grid gap-8 md:grid-cols-5">
      <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-7 md:col-span-2">
        <h1 className="font-[var(--font-display)] text-4xl text-slate-900">Contact</h1>
        <div className="space-y-2 text-sm leading-7 text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Email:</span> {data.contact?.email}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Phone:</span> {data.contact?.phone}
          </p>
          <p>
            <span className="font-semibold text-slate-900">WhatsApp:</span> {data.contact?.whatsapp}
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-slate-500">Address</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{data.contact?.address}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-slate-500">Office Hours</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {(data.contact?.officeHours || []).map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          {(data.contact?.socialLinks || []).map((item) => (
            <a key={item._key || item.url} href={item.url} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-xs uppercase tracking-[0.12em] text-slate-700">
              {item.platform}
            </a>
          ))}
        </div>
      </article>

      <article className="space-y-4 rounded-3xl border border-slate-200 bg-white p-7 md:col-span-3">
        <h2 className="font-[var(--font-display)] text-3xl text-slate-900">Frequently Asked Questions</h2>
        {(data.faqs || []).map((faq) => (
          <details key={faq._id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">{faq.question}</summary>
            <p className="mt-2 text-sm leading-7 text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </article>
    </section>
  )
}
