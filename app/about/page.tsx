import {CmsImage} from '@/components/cms-image'
import {RichText} from '@/components/rich-text'
import {ABOUT_PAGE_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type AboutData = {
  aboutPage?: {
    headline?: string
    intro?: string
    content?: unknown
  }
  seo?: {
    title?: string
    description?: string
    image?: unknown
  } 
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
        <h1 className="font-[var(--font-display)] text-4xl text-slate-900">{data.aboutPage?.headline}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {data.aboutPage?.content ? <RichText value={data.aboutPage.content} /> : ''  }
        </p>
      </header>
    </section>
  )
}
