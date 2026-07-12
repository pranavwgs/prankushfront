import Link from 'next/link'

type LinkItem = {
  _key?: string
  label: string
  href: string
  openInNewTab?: boolean
}

type FooterColumn = {
  _key?: string
  title?: string
  links?: LinkItem[]
}

type SocialLink = {
  _key?: string
  platform: string
  url: string
}

type SiteFooterProps = {
  headline?: string
  aboutText?: string
  linkColumns?: FooterColumn[]
  socialLinks?: SocialLink[]
  copyrightText?: string
}

export function SiteFooter({headline, aboutText, linkColumns, socialLinks, copyrightText}: SiteFooterProps) {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          {headline ? <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{headline}</h2> : null}
          {aboutText ? <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{aboutText}</p> : null}
        </div>

        {(linkColumns || []).map((column) => (
          <div key={column._key || column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {(column.links || []).map((item) => (
                <li key={item._key || `${item.label}-${item.href}`}>
                  <Link href={item.href} target={item.openInNewTab ? '_blank' : undefined} rel={item.openInNewTab ? 'noreferrer' : undefined} className="text-sm text-slate-700 hover:text-slate-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-5 text-xs text-slate-500">
        <span>{copyrightText || `© ${new Date().getFullYear()} Star Agency. All rights reserved.`}</span>
        <div className="flex flex-wrap gap-4">
          {(socialLinks || []).map((item) => (
            <a key={item._key || item.url} href={item.url} target="_blank" rel="noreferrer" className="uppercase tracking-[0.1em] hover:text-slate-900">
              {item.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
