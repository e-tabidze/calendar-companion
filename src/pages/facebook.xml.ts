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

    const paginationData = {
        success:true,
        code:'success',
        result:{
total:100,
            data:[
                {
                    id: 105,
                    user_id: 4111607,
                    company_id: 39,
                    vin: null,
                    plate: 'JT188JT',
                    man_id: 43,
                    model_id: 2362,
                    prod_year: 2024,
                    car_run: 56653,
                    measure: 'km',
                    additional_information: 'resr',
                    use_instruction: 'rejaud',
                    images: 'https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_1.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_2.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_3.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_4.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_5.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_6.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_7.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_8.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_9.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_10.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_11.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_12.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/thumbs/105_13.jpg',
                    large_images: 'https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_1.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_2.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_3.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_4.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_5.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_6.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_7.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_8.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_9.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_10.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_11.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_12.jpg,https://static.my.ge/myauto/rent/photos/5/0/1/0/0/large/105_13.jpg',
                    category_id: 3,
                    fuel_type_id: 4,
                    seat_type_id: 4,
                    luggage_numbers: 4,
                    door_type_id: 2,
                    drive_tires_id: 3,
                    transmission_type_id: 1,
                    price: '20',
                    price_usd: '7.247',
                    price_gel: '20',
                    currency: 'GEL',
                    apply_discount: 0,
                    any_period: 1,
                    preparation_period_type_id: null,
                    min_time_interval: null,
                    min_time_span: null,
                    start_city: 'თბილისი',
                    end_city: 'თბილისი',
                    start_address: 'ბელინსკი',
                    end_address: 'ბელინსკი',
                    start_lat: null,
                    start_lon: null,
                    end_lat: null,
                    end_lon: null,
                    created_at: '2024-06-13T06:08:54.000000Z',
                    updated_at: '2024-06-20T20:28:53.000000Z',
                    deleted_at: null,
                    steering_wheel: '1',
                    is_active: 1,
                    is_allowed: 1,
                    has_other_delivery_locations: 0,
                    has_other_return_locations: 0,
                    has_deposit: 0,
                    deposit_amount: '0',
                    deposit_currency: 'GEL',
                    additional_information_en: 'rers',
                    additional_information_ru: null,
                    use_instruction_en: 'reajdgc',
                    use_instruction_ru: null,
                    count_user_favourites: 0,
                    preparation_period: null,
                    is_favourite: false,
                    other_delivery_locations: [],
                    other_return_locations: [],
                    discount_calculation_percent: 0,
                    manufacturer: {
                      id: 43,
                      title: 'Volvo',
                      logo: null,
                      type_id: null,
                      created_at: null,
                      updated_at: null,
                      deleted_at: null
                    },
                    manufacturer_model: {
                      id: 2362,
                      manufacturer_id: 43,
                      title: 'XC 40',
                      type_id: null,
                      created_at: null,
                      updated_at: null,
                      deleted_at: null
                    },
                    seat_type: {
                      id: 4,
                      title: '3',
                      type_id: null,
                      created_at: null,
                      updated_at: null,
                      deleted_at: null
                    }
                  }
            ]
        }
    }
    console.log(paginationData)
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

const xml = await generateFacebookXml(listings)
    res.setHeader('Content-Type', 'text/xml')
    res.write(xml)
    res.end()

    return {
      props: {}
    }

}

export default FacebookXml
