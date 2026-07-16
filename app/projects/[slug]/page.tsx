import { notFound } from "next/navigation";
import Link from "next/link";
//import { ArrowRight } from "lucide-react";

import { CmsImage } from "@/components/cms-image";
import { RichText } from "@/components/rich-text";

import { PROJECT_BY_SLUG_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";

type ProjectDetail = {
  title?: string;
  clientName?: string;
  industry?: string;
  featuredImage?: unknown;
  gallery?: unknown[];
  overview?: string;
  challenges?: string;
  solutions?: string;
  technologies?: string;
  results?: unknown;
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await sanityFetch<ProjectDetail | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug }
  );

  if (!project) notFound();

  return (
    <article className="overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm">

      {/* Hero */}

      <section className="relative isolate overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-20 lg:grid-cols-2 items-center">

            {/* Left */}

            <div>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Case Study
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
                {project.title}
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-9 text-slate-300">
                {project.overview}
              </p>

              <div className="mt-12 flex flex-wrap gap-4">

                <Link
                  href="/contact"
                  className="rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-white transition hover:bg-cyan-400"
                >
                  Start Project
                </Link>

                <Link
                  href="/projects"
                  className="rounded-xl border border-white/20 px-7 py-4 font-semibold text-white hover:bg-white/10"
                >
                  View Portfolio
                </Link>

              </div>

            </div>

            {/* Right */}

            <div className="relative">

              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-cyan-500/30 to-violet-500/30 blur-3xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,.45)]">

                <CmsImage
                  image={project.featuredImage}
                  alt={project.title || ""}
                  width={1400}
                  height={900}
                  className="w-full"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Project Info */}

      <section className="-mt-20 relative z-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-6 rounded-[32px] bg-white p-10 shadow-2xl md:grid-cols-4">

            <div>

              <p className="text-sm uppercase tracking-widest text-slate-500">
                Client
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                {project.clientName}
              </h3>

            </div>

            <div>

              <p className="text-sm uppercase tracking-widest text-slate-500">
                Industry
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                {project.industry}
              </h3>

            </div>

            <div>

              <p className="text-sm uppercase tracking-widest text-slate-500">
                Services
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                UI/UX & Development
              </h3>

            </div>

            {/* <div>

              <p className="text-sm uppercase tracking-widest text-slate-500">
                Platform
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900">
                Responsive Website
              </h3>

            </div> */}

          </div>

        </div>

      </section>

      {/* Overview */}

      {/* <section className="mx-auto mt-32 max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-12">

          <div className="lg:col-span-4">

            <p className="font-semibold uppercase tracking-[0.3em] text-cyan-600">
              Overview
            </p>

            <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900">
              Creating an engaging digital experience for a premium tile brand.
            </h2>

          </div>

          <div className="prose prose-lg max-w-none text-slate-600 lg:col-span-8">

            <RichText value={project.overview} />

          </div>

        </div>

      </section> */}

            {/* =========================
          Challenge & Solution
      ========================== */}

      <section className="mx-auto mt-32 max-w-7xl px-6">

        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
            Our Process
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Challenge & Solution
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Our goal was to build a premium digital experience that reflects
            the quality of Ceramic Tile Warehouse while making product discovery
            simple and enjoyable.
          </p>
        </div>

        <div className="grid gap-8">

          {/* Challenge */}

          <div className="group rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
              ⚠️
            </div>

            <h3 className="mt-8 text-3xl font-bold">
              Challenges
            </h3>
            <div className="mt-4 text-slate-600">
              {project.challenges && (
                <RichText value={project.challenges} />
              )}
            </div>

            {/* <h3 className="mt-8 text-3xl font-bold">
              Challenges
            </h3>

            {/* <ul className="mt-8 space-y-5 text-slate-600">

              <li>✔ Organizing a large catalogue of flooring products.</li>

              <li>✔ Creating a premium shopping experience.</li>

              <li>✔ Maintaining excellent loading performance.</li>

              <li>✔ Making navigation simple across all devices.</li>

              <li>✔ Improving enquiry generation.</li>

            </ul> */}

          </div>

          {/* Solution */}

          <div className="group rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl transition-all duration-300 hover:-translate-y-2">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-3xl">
              🚀
            </div>
            <h3 className="mt-8 text-3xl font-bold">
              Our Solution
            </h3>
            <div className="mt-4">
              {project.solutions && (
                <RichText value={project.solutions} />
              )}
            </div>

            {/*<h3 className="mt-8 text-3xl font-bold">
              Our Solution
            </h3>

             <ul className="mt-8 space-y-5 text-slate-300">

              <li>✔ Modern responsive interface</li>

              <li>✔ Fast optimized images</li>

              <li>✔ Clean product categorization</li>

              <li>✔ SEO friendly architecture</li>

              <li>✔ Conversion focused layouts</li>

            </ul> */}

          </div>

        </div>

      </section>

      {/* =========================
            Statistics
      ========================== */}

      <section className="mx-auto mt-32 max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {[
            {
              number: "100%",
              label: "Responsive"
            },
            {
              number: "95+",
              label: "Performance Ready"
            },
            {
              number: "SEO",
              label: "Optimized"
            },
            {
              number: "Fast",
              label: "Loading Experience"
            },
          ].map((item) => (

            <div
              key={item.label}
              className="rounded-[30px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <h3 className="text-5xl font-black text-cyan-600">
                {item.number}
              </h3>

              <p className="mt-4 text-slate-600">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* =========================
          Technologies
      ========================== */}

      <section className="mx-auto mt-32 max-w-7xl px-6">

        {/* <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
            Technology Stack
          </span>

          <h2 className="mt-4 text-5xl font-black">
            Built Using Modern Technologies
          </h2>

        </div>
        <div> 
          {project.technologies && (
            <RichText value={project.technologies} />
          )}
        </div> */}

        {/* <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "HTML5",
            "CSS3",
            "JavaScript",
            "Bootstrap",
            "PHP",
            "MySQL",
            "WordPress",
            "WooCommerce",
            "SEO",
            "Image Optimization",
            "Responsive Design",
            "Performance"
          ].map((tech) => (

            <div
              key={tech}
              className="group rounded-[28px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-2xl">
                💻
              </div>

              <h3 className="mt-8 text-xl font-bold">
                {tech}
              </h3>

            </div>

          ))}

        </div> */}

      </section>

      {/* =========================
          Deliverables
      ========================== */}

      {/* <section className="mx-auto mt-32 max-w-7xl px-6">

        <div className="grid gap-8 lg:grid-cols-2">

          <div>

            <h2 className="text-4xl font-black">
              Deliverables
            </h2>

            <div className="mt-10 space-y-5">

              {[
                "Website Design",
                "Responsive Development",
                "Performance Optimization",
                "SEO Optimization",
                "Product Catalogue",
                "Contact Forms",
                "Security",
                "Technical Support",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

          <div className="rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-12 text-white">

            <span className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              Project Highlights
            </span>

            <h3 className="mt-6 text-4xl font-black">
              Designed to Impress.
              Built to Perform.
            </h3>

            <p className="mt-8 text-lg leading-9 text-slate-300">

              Every section was carefully designed to enhance the user
              experience, improve engagement, and help visitors quickly
              discover products while reinforcing the premium quality of
              the Ceramic Tile Warehouse brand.

            </p>

          </div>

        </div>

      </section> */}
      </article>
  )}
