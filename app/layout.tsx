import type {Metadata} from 'next'
import {Bricolage_Grotesque, Fraunces} from 'next/font/google'
import {SiteFooter} from '@/components/site-footer'
import {SiteHeader} from '@/components/site-header'
import {SITE_CHROME_QUERY} from '@/lib/queries'
import {sanityFetch} from '@/lib/sanity'
import './globals.css'

const bodyFont = Bricolage_Grotesque({
  variable: '--font-body',
  subsets: ['latin'],
})

const displayFont = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
})

type SiteChrome = {
  navigation?: {
    siteTitle?: string
    menuItems?: Array<{label: string; href: string; openInNewTab?: boolean}>
    cta?: {label: string; href: string; openInNewTab?: boolean}
  }
  footer?: {
    headline?: string
    aboutText?: string
    linkColumns?: Array<{
      _key?: string
      title?: string
      links?: Array<{_key?: string; label: string; href: string; openInNewTab?: boolean}>
    }>
    socialLinks?: Array<{_key?: string; platform: string; url: string}>
    copyrightText?: string
  }
}

export const metadata: Metadata = {
  title: 'Star Agency',
  description: 'CMS-powered agency website built with Next.js and Sanity.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const chrome = await sanityFetch<SiteChrome>(SITE_CHROME_QUERY)

  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f7f8fa] text-slate-900">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_8%_12%,rgba(11,110,253,0.16),transparent_32%),radial-gradient(circle_at_92%_78%,rgba(26,155,111,0.14),transparent_28%),linear-gradient(180deg,#f9fafb_0%,#f2f5f9_100%)]" />
        <div className="mx-auto flex min-h-screen w-full flex-col">
          <SiteHeader
            siteTitle={chrome.navigation?.siteTitle}
            menuItems={chrome.navigation?.menuItems}
            cta={chrome.navigation?.cta}
          />
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
          <SiteFooter
            headline={chrome.footer?.headline}
            aboutText={chrome.footer?.aboutText}
            linkColumns={chrome.footer?.linkColumns}
            socialLinks={chrome.footer?.socialLinks}
            copyrightText={chrome.footer?.copyrightText}
          />
        </div>
      </body>
    </html>
  )
}
