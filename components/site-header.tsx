import Link from 'next/link'

type LinkItem = {
  label: string
  href: string
  openInNewTab?: boolean
}

type SiteHeaderProps = {
  siteTitle?: string
  menuItems?: LinkItem[]
  cta?: LinkItem
}

const fallbackItems: LinkItem[] = [
  {label: 'Services', href: '/services'},
  {label: 'Projects', href: '/projects'},
  {label: 'Blog', href: '/blog'},
  {label: 'Careers', href: '/careers'},
  {label: 'Contact', href: '/contact'},
]

export function SiteHeader({siteTitle, menuItems, cta}: SiteHeaderProps) {
  const links = menuItems?.length ? menuItems : fallbackItems

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          {siteTitle || 'Star Agency'}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        {cta ? (
          <Link
            href={cta.href}
            target={cta.openInNewTab ? '_blank' : undefined}
            rel={cta.openInNewTab ? 'noreferrer' : undefined}
            className="rounded-full bg-[#0b6efd] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#095ad0]"
          >
            {cta.label}
          </Link>
        ) : (
          <Link href="/contact" className="rounded-full bg-[#0b6efd] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#095ad0]">
            Contact
          </Link>
        )}
      </div>
    </header>
  )
}
