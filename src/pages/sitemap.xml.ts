const EXTERNAL_DATA_URL = 'https://test-api-rent.myauto.ge/api/product-filters'
import { DOMAIN } from 'src/env'

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
    <sitemap>
      <loc>${`${DOMAIN}/sitemap/product-filters.xml`}</loc>
    </sitemap>

    <sitemap>
      <loc>${`${DOMAIN}/sitemap/cities.xml`}</loc>
    </sitemap>

   </sitemapindex>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL)
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
  // @ts-ignore
  const sitemap = generateSiteMap(posts.main)

  res.setHeader('Content-Type', 'text/xml')

  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
