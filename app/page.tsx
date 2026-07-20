import Link from 'next/link'
import {CmsImage} from '@/components/cms-image'
import {HOMEPAGE_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type HomepageData = {
  heroEyebrow?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: unknown
  heroBackgroundVideoUrl?: string
  heroCta?: {label: string; href: string; openInNewTab?: boolean}
  heroSecondaryCta?: {label: string; href: string; openInNewTab?: boolean}
  heroStats?: Array<{_key?: string; value: string; label: string}>
  clientLogos?: Array<{_key?: string; name: string; website?: string; logo?: unknown}>
  featuredServices?: Array<{_id: string; name: string; slug: string; summary?: string; icon?: string}>
  featuredProjects?: Array<{
    _id: string
    title: string
    slug: string
    clientName?: string
    resultSummary?: string
    featuredImage?: unknown
  }>
  featuredTestimonials?: Array<{
    _id: string
    clientName: string
    clientRole?: string
    quote: string
    rating?: number
  }>
}

export default async function Home() {
  const homepage = await sanityFetch<HomepageData>(HOMEPAGE_QUERY)
  console.log('homepage', homepage)
  const heroStats =
    homepage?.heroStats?.length
      ? homepage.heroStats
      : [
          {value: `${homepage?.featuredServices?.length || 0}+`, label: 'Featured Services'},
          {value: `${homepage?.featuredProjects?.length || 0}+`, label: 'Case Studies'},
          {value: `${homepage?.clientLogos?.length || 0}+`, label: 'Client Teams'},
        ]

  return (
    <div className="space-y-16">
      <section className="relative isolate left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[78vh] w-screen overflow-hidden border-y border-white/25 bg-transparent px-6 py-10 md:px-12 md:py-12 lg:px-20">
        {homepage?.heroBackgroundVideoUrl ? (
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={homepage.heroBackgroundVideoUrl} />
          </video>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(10,18,36,0.60)_6%,rgba(11,33,69,0.52)_34%,rgba(8,22,45,0.56)_65%,rgba(6,15,31,0.65)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(11,110,253,0.26),transparent_35%),radial-gradient(circle_at_82%_80%,rgba(26,155,111,0.22),transparent_33%)]" />
        <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(11,110,253,0.22),rgba(11,110,253,0))]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(26,155,111,0.18),rgba(26,155,111,0))]" />

        <div className="relative mx-auto grid min-h-[66vh] w-full max-w-7xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/30 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-100 backdrop-blur-md">
              {homepage?.heroEyebrow || 'Strategy-led Digital Growth'}
            </p>
            <h1 className="mt-5 max-w-3xl font-[var(--font-display)] text-4xl leading-tight text-white md:text-6xl">
            {homepage?.heroTitle || 'Build a content-driven digital presence'}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100/90 md:text-lg">{homepage?.heroSubtitle}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={homepage?.heroCta?.href || '/contact'}
                target={homepage?.heroCta?.openInNewTab ? '_blank' : undefined}
                rel={homepage?.heroCta?.openInNewTab ? 'noreferrer' : undefined}
                className="rounded-full bg-[#0b6efd] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-14px_rgba(11,110,253,0.9)] transition hover:bg-[#095ad0]"
              >
                {homepage?.heroCta?.label || 'Start a Project'}
              </Link>
              <Link
                href={homepage?.heroSecondaryCta?.href || '/projects'}
                target={homepage?.heroSecondaryCta?.openInNewTab ? '_blank' : undefined}
                rel={homepage?.heroSecondaryCta?.openInNewTab ? 'noreferrer' : undefined}
                className="rounded-full border border-white/45 bg-white/15 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/22"
              >
                {homepage?.heroSecondaryCta?.label || 'Explore Work'}
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.slice(0, 3).map((stat, index) => (
                <div key={stat._key || `${stat.label}-${index}`} className="rounded-xl border border-white/30 bg-white/12 p-3 backdrop-blur-md">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-slate-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 z-20 rounded-2xl border border-white/35 bg-white/14 px-4 py-3 shadow-xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-100">Performance Lift</p>
              <p className="text-2xl font-bold text-white">+34%</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/35 bg-white/10 backdrop-blur-sm">
              {homepage?.heroImage ? (
                <CmsImage
                  image={homepage?.heroImage}
                  alt={homepage?.heroTitle || 'Hero image'}
                  width={1100}
                  height={940}
                  className="h-[420px] w-full object-cover opacity-95"
                />
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center bg-gradient-to-br from-white/20 to-white/8 px-6 text-center text-sm text-slate-100">
                  Add a Hero Image in Studio to complete this section
                </div>
              )}
            </div>

            <div className="absolute -bottom-4 left-4 rounded-2xl border border-white/35 bg-white/14 px-4 py-3 shadow-xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-100">Campaign Velocity</p>
              <p className="text-2xl font-bold text-white">2.4x</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Trusted by teams at</p>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white py-4">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="marquee-track flex w-max items-center gap-3 px-3">
            {[...(homepage?.clientLogos || []), ...(homepage?.clientLogos || [])].map((client, index) => {
              const content = (
                <div className="flex h-12 min-w-40 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
                  {client.logo ? (
                    <CmsImage image={client.logo} alt={client.name} width={140} height={40} className="h-6 w-auto object-contain" />
                  ) : (
                    <span>{client.name}</span>
                  )}
                </div>
              )

              return client.website ? (
                <a key={`${client._key || client.name}-${index}`} href={client.website} target="_blank" rel="noreferrer" className="shrink-0">
                  {content}
                </a>
              ) : (
                <div key={`${client._key || client.name}-${index}`} className="shrink-0">
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-[var(--font-display)] text-3xl text-slate-900">Featured Services</h2>
          <Link href="/services" className="text-sm font-semibold text-[#0b6efd] hover:text-[#095ad0]">
            View all services
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(homepage?.featuredServices || []).map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{service.icon || 'service'}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{service.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="projects-motion-shell relative overflow-hidden rounded-3xl border border-white/45 bg-white/40 p-6 backdrop-blur-lg md:p-8">
        <div className="projects-motion-glow projects-motion-glow-a" />
        <div className="projects-motion-glow projects-motion-glow-b" />
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-[var(--font-display)] text-3xl text-slate-900">Selected Projects</h2>
          <Link href="/projects" className="rounded-full border border-slate-300/60 bg-white/75 px-4 py-2 text-sm font-semibold text-[#0b6efd] transition hover:border-[#0b6efd] hover:text-[#095ad0]">
            Browse projects
          </Link>
        </div>
        <div className="projects-motion-grid relative grid gap-6 md:grid-cols-2">
          {(homepage?.featuredProjects || []).map((project, index) => (
            <Link key={project._id} href={`/projects/${project.slug}`} className={`projects-motion-card group rounded-2xl border border-slate-200 bg-white p-4 ${index % 2 === 0 ? 'md:translate-y-3' : ''}`}>
              <div className="projects-motion-shine" />
              {project.featuredImage ? (
                <div className="overflow-hidden rounded-xl">
                  <CmsImage
                    image={project.featuredImage}
                    alt={project.title}
                    width={900}
                    height={540}
                    className="projects-motion-image h-52 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-52 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 px-4 text-center text-sm text-slate-500">
                  Add "Featured Image" in Sanity for this project
                </div>
              )}
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{project.title}</h3>
              <p className="text-sm text-slate-500">{project.clientName}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{project.resultSummary}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0b6efd]">
                View case study <span className="ml-2 transition group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10">
        <h2 className="font-[var(--font-display)] text-3xl text-slate-900">Client Voices</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(homepage?.featuredTestimonials || []).map((item) => (
            <article key={item._id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-sm leading-7 text-slate-700">"{item.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{item.clientName}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{item.clientRole}</p>
            </article>
          ))}
        </div>
      </section> */}
    </div>
  )
}
