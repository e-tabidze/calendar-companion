import { DOMAIN } from 'src/env'

const EXTERNAL_DATA_URL = `/storage/categories.json`

function generateSiteMaps(posts) {
  let allCat = []

  for (let index = 0; index < posts.length; index++) {
    allCat.push({
      url_path: posts[index].url_path
    })
    for (let sub = 0; sub < posts[index]?.children?.length; sub++) {
      allCat.push({
        ...allCat,
        url_path: posts[index].children[sub].url_path
      })
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
     ${allCat
       .map(({ url_path }) => {
         return `
          <url>
            <loc>${`${DOMAIN}/c/${url_path}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
            <xhtml:link rel="alternate" hreflang="ka" href="${`${DOMAIN}/c/${url_path}`}"/>
          </url> `
       })
       .join('')}

   </urlset>
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
  const sitemap = generateSiteMaps(posts.main)

  res.setHeader('Content-Type', 'text/xml')

  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
