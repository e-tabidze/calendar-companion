import { DOMAIN, CITIES_INDEX } from 'src/env'

function generateCitiesSitemap(cities) {
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  cities.forEach(city => {
    xmlContent += `
      <url>
        <loc>${DOMAIN}/search?page=1&amp;location=${city.city}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
  })

  xmlContent += '\n</urlset>'

  return xmlContent
}

export async function getServerSideProps({ res }) {
  try {
    const citiesResponse = await fetch(CITIES_INDEX)
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
