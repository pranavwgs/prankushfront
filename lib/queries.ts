export const SITE_CHROME_QUERY = `{
  "navigation": *[_type == "navigation" && _id == "navigation"][0]{
    siteTitle,
    menuItems,
    cta
  },
  "footer": *[_type == "footer" && _id == "footer"][0]{
    headline,
    aboutText,
    linkColumns,
    socialLinks,
    copyrightText
  },
  "siteSeo": *[_type == "siteSeo" && _id == "siteSeo"][0]{
    siteName,
    siteUrl,
    twitterHandle,
    defaultSeo
  }
}`

export const HOMEPAGE_QUERY = `*[_type == "homepage" && _id == "homepage"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroBackgroundVideoUrl,
  heroCta,
  heroSecondaryCta,
  heroStats,
  clientLogos,
  seo,
  featuredServices[]->{
    _id,
    name,
    "slug": slug.current,
    summary,
    icon
  },
  featuredProjects[]->{
    _id,
    title,
    "slug": slug.current,
    clientName,
    resultSummary,
    featuredImage
  },
  "featuredTestimonials": *[_type == "testimonial" && isFeatured == true][0...4]{
    _id,
    clientName,
    clientRole,
    quote,
    rating,
    avatar
  }
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(name asc){
  _id,
  name,
  "slug": slug.current,
  summary,
  icon,
  details,
  isFeatured
}`

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  summary,
  icon,
  details,
  isFeatured,
  seo
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  clientName,
  featuredImage,
  resultSummary,
  isFeatured
}`

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  clientName,
  industry,
  featuredImage,
  gallery,
  overview,
  challenges,
  solutions,
  technologies,
  results,
  isFeatured,
  seo
}`

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  body,
  seo
}`

export const CAREERS_QUERY = `{
  "careerPage": *[_type == "careerPage" && _id == "careerPage"][0]{
    headline,
    intro,
    benefits,
    applicationEmail,
    seo
  },
  "jobs": *[_type == "jobOpening" && isOpen == true] | order(coalesce(postedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    employmentType,
    location,
    isRemote,
    summary,
    postedAt
  }
}`

export const JOB_BY_SLUG_QUERY = `*[_type == "jobOpening" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  employmentType,
  location,
  isRemote,
  summary,
  description,
  isOpen,
  postedAt
}`

export const CONTACT_PAGE_QUERY = `{
  "contact": *[_type == "contactInfo" && _id == "contactInfo"][0]{
    email,
    phone,
    whatsapp,
    address,
    officeHours,
    mapEmbedUrl,
    socialLinks
  },
  "faqs": *[_type == "faq"] | order(category asc, sortOrder asc){
    _id,
    question,
    answer,
    category
  }
}`

export const ABOUT_PAGE_QUERY = `{
 "aboutPage": *[_type == "aboutPage" && _id == "aboutPage"][0]{
    headline,
    intro,
    content,
    seo
  },
  "team": *[_type == "teamMember"] | order(sortOrder asc){
    _id,
    fullName,
    role,
    photo,
    bio,
    socialLinks,
    isLeadership
  },
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc){
    _id,
    clientName,
    clientRole,
    quote,
    rating,
    avatar
  }
}`
