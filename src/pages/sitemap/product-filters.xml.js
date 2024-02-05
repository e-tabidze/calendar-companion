import { DOMAIN, API_URL } from 'src/env'

const CATEGORIES_URL = `${API_URL}/product-filters`

function generateCitiesSitemap(categories) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     ${categories
       .map(({ id }) => {
         return `
          <url>
            <loc>${DOMAIN}/search/?page=1&amp;category[]=${id}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
            <xhtml:link rel="alternate" hreflang="ka" href="${DOMAIN}/search/?page=1&amp;category[]=${id}"/>
          </url> `
       })
       .join('')}
   </urlset>
 `
}

export async function getServerSideProps({ res }) {
  try {
    const categoriesResponse = await fetch(CATEGORIES_URL)
    const categoriesData = await categoriesResponse.json()

    const categories = categoriesData.result.data.categories

    const categoriesSitemap = generateCitiesSitemap(categories)

    res.setHeader('Content-Type', 'text/xml')

    res.write(categoriesSitemap)
    res.end()

    return { props: {} }
  } catch (error) {
    console.error('Error generating categories sitemap:', error.message)
    res.statusCode = 500
    res.end('Error generating categories sitemap')

    return { props: { error: error.message } }
  }
}

export default function CategoriesSitemap() {
  return null
}
