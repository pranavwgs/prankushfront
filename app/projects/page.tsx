import Link from 'next/link'
import {CmsImage} from '@/components/cms-image'
import {PROJECTS_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'

type ProjectCard = {
  _id: string
  title: string
  slug: string
  clientName?: string
  featuredImage?: unknown
  resultSummary?: string
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<ProjectCard[]>(PROJECTS_QUERY)

  return (
    <section>
      <h1 className="font-[var(--font-display)] text-4xl text-slate-900">Projects</h1>
      <p className="mt-3 max-w-2xl text-slate-600">A selection of campaigns and digital experiences we have delivered.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <CmsImage image={project.featuredImage} alt={project.title} width={1000} height={620} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-slate-900">{project.title}</h2>
              <p className="text-sm text-slate-500">{project.clientName}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{project.resultSummary}</p>
              <Link href={`/projects/${project.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#0b6efd] hover:text-[#095ad0]">
                View case study
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
