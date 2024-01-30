import { DOMAIN, CATEGORIES_INDEX } from 'src/env'

function generateCitiesSitemap(categories) {
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  categories.forEach(category => {
    xmlContent += `
      <url>
        <loc>${DOMAIN}/search?page=1&amp;category[]=${category.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
  })

  xmlContent += '\n</urlset>'

  return xmlContent
}

export async function getServerSideProps({ res }) {
  try {
    const categoriesResponse = await fetch(CATEGORIES_INDEX)
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
