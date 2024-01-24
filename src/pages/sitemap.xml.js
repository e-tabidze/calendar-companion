const EXTERNAL_DATA_URL = 'https://test-front-rent.myauto.ge/filters.json'
import { DOMAIN } from 'src/env'

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
    <sitemap>
      <loc>${`${DOMAIN}/sitemap/filters.xml`}</loc>
    </sitemap>

    <sitemap>
      <loc>${`${DOMAIN}/sitemap/product.xml`}</loc>
    </sitemap>

   </sitemapindex>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL)
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
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
