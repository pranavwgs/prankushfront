import {PortableText, type PortableTextComponents} from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mt-4 leading-8 text-slate-700">{children}</p>,
  },
  list: {
    bullet: ({children}) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>,
  },
}

export function RichText({value}: {value: unknown}) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
