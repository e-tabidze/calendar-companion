import { DOMAIN, API_URL } from 'src/env'

const CITIES_URL = `${API_URL}/cities`

function generateCitiesSitemap(cities) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     ${cities.map(({ city }) => {
         return `
          <url>
            <loc>${DOMAIN}/search/?page=1&amp;location=${city}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
            <xhtml:link rel="alternate" hreflang="ka" href="${DOMAIN}/search/?page=1&amp;location=${city}"/>
          </url> `
       })
       .join('')}
   </urlset>
 `
}

export async function getServerSideProps({ res }) {
  try {
    const citiesResponse = await fetch(CITIES_URL)
    const citiesData = await citiesResponse.json()

    const cities = citiesData.result.data

    const citiesSitemap = generateCitiesSitemap(cities)

    res.setHeader('Content-Type', 'text/xml')

    res.write(citiesSitemap)
    res.end()

    return { props: {} }
  } catch (error) {
    console.error('Error generating cities sitemap:', error.message)
    res.statusCode = 500
    res.end('Error generating cities sitemap')

    return { props: { error: error.message } }
  }
}

export default function CitiesSitemap() {
  return null
}
