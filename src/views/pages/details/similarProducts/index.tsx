import ProductCard from 'src/views/components/productCard'
import Typography from 'src/views/components/typography'

const SimilarProducts = () => {
  return (
    <div>
      <Typography type='h3'>მსგავსი მანქანები</Typography>
      <div className='flex gap-2 mt-10 overflow-auto'>
        <ProductCard productId={0} manufacturer={''} model={''} prodYear={0} priceGel={0} />
        <ProductCard productId={0} manufacturer={''} model={''} prodYear={0} priceGel={0} />
        <ProductCard productId={0} manufacturer={''} model={''} prodYear={0} priceGel={0} />
      </div>
    </div>
  )
}

export default SimilarProducts
