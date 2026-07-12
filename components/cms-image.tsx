import Image from 'next/image'
import {urlFor} from '@/lib/image'

type CmsImageProps = {
  image: unknown
  alt: string
  width: number
  height: number
  className?: string
}

export function CmsImage({image, alt, width, height, className}: CmsImageProps) {
  if (!image) return null

  const src = urlFor(image).width(width).height(height).fit('crop').auto('format').url()

  return <Image src={src} alt={alt} width={width} height={height} className={className} />
}
