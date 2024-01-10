import { useRouter } from 'next/router'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'

interface Props {
  svgPath: string
  title: string
  count: number
  id: number
}

const CategoryItem: React.FC<Props> = ({ svgPath, title, count, id }) => {
  const router = useRouter()

  return (
    <div className='flex group flex-col items-center cursor-pointer' onClick={() => router?.push(`/search/?category[]=${id}`)}>
      <Icon svgPath={svgPath} width={48} height={48} className='transition-all duration-200 group-hover:fill-green-100 scale-[1.9]'/>
      <Typography className='text-raisin text-center text-2sm md:text-md mt-2 md:mt-4' type='subtitle'>
        {title}
      </Typography>
      <Typography className='text-raisin-40 text-center text-2sm md:text-md' type='body' color='light'>
        {count}
      </Typography>
    </div>
  )
}

export default CategoryItem
