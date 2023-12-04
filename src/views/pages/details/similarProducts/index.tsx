import ProductCard from 'src/views/components/productCard'
import Typography from 'src/views/components/typography'

interface Props {
  data: any[]
}

const SimilarProducts: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <Typography type='h3'>მსგავსი მანქანები</Typography>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-10'>
        {data?.map(product => (
          <ProductCard
            key={product?.id}
            productId={product?.id}
            manufacturer={product?.manufacturer?.title}
            model={product?.manufacturer_model?.title}
            prodYear={product?.prod_year}
            priceGel={product?.price_gel}
            countProductFavs={product?.count_user_favourites}
          />
        ))}
      </div>
    </div>
  )
}

export default SimilarProducts
