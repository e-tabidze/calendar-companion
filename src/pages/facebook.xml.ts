import { GetServerSideProps } from 'next'
import { DOMAIN, API_URL } from 'src/env'

export function generateFacebookXml(listings: Array<any>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <listings>
    <title>Rent.Myauto.Ge Facebook Listings</title>
    <link rel="self" href="https://rent.myauto.ge/"/>
     ${listings
       .map(listing => {
         const imageList = listing.images === undefined ? [] : listing.images?.split(',')

         const imagesXml = imageList
           .map((imageUrl: string) => {
             return `
          <image>
            <url>${imageUrl}</url>
          </image>
          `
           })
           .join('')

         return `
         <listing>
          <car_listing_id>${listing.id}</car_listing_id>
          <manufacturer>${listing.manufacturer.title}</manufacturer>
          <model>${listing.manufacturer_model.title}</model>
          <city>${listing.start_city || 'თბილისი'}</city>
          <year>${listing.prod_year}</year>
          <region>საქართველო</region>
          <country>საქართველო</country>
          
          ${imagesXml}
           ${listing.room ? `<num_rooms>${listing.room}</num_rooms>` : ''}
           ${listing.bedroom ? `<num_beds>${listing.bedroom}</num_beds>` : ''}
          <price>${listing.price_gel} GEL</price>
          <url>${DOMAIN}/details/${listing.id}</url>
        </listing>`
       })
       .join('')}

    </listings>
 `
}

function FacebookXml() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
  try {
    console.log("API_URL:", API_URL);
    console.log("DOMAIN:", DOMAIN);

    locale = locale === 'default' || locale === undefined ? 'ka' : locale

    const query = 'page=1&sort_by=id&order_by=desc'

    const paginationResponse = await fetch(`${API_URL}/search-products?${query}`, {
      headers: {
        'X-Website-Key': 'myauto',
        locale
      }
    })

    if (!paginationResponse.ok) {
      throw new Error(`Failed to fetch pagination data: ${paginationResponse.statusText}`)
    }

    const paginationData = await paginationResponse.json()
    const totalStatements = paginationData.result.total
    const numberOfRequests = Math.trunc(totalStatements / 50) + 1

    const promises: any = []

    for (let i = 1; i <= numberOfRequests; i++) {
      promises.push(
        fetch(`${API_URL}/search-products?${query}&page=${i}`, {
          headers: {
            'X-Website-Key': 'myauto',
            locale
          }
        }).then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error(`Failed to fetch data for page ${i}: ${res.statusText}`)
          }
        })
      )
    }

    const response = (await Promise.all(promises)) as any[]

    const listings = response.flatMap(data => data.result.data)

    if (!Array.isArray(listings)) {
      throw new Error("Invalid data format: listings is not an array");
    }

    const xml = generateFacebookXml(listings)

    res.setHeader('Content-Type', 'text/xml')

    //   we send the XML to the browser
    res.write(xml)
    res.end()

    return {
      props: {}
    }
  } catch (error: any) {
    console.error('Error generating XML:', error.message, error.stack)
    res.statusCode = 500
    res.end('Internal Server Error', error.message, error.stack)
    
    return {
      props: {}
    }
  }
}

export default FacebookXml
