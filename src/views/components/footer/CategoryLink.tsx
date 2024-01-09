import { useRouter } from 'next/router'
import Typography from '../typography'

interface Props {
    title: string
    id: number
}

const CategoryLink: React.FC<Props> = ({  title, id }) => {
    const router = useRouter()

    return (
        <div className='cursor-pointer' onClick={() => router?.push(`/search/?category[]=${id}`)}>
            <Typography className='font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline' type='subtitle'>
                {title}
            </Typography>
        </div>
    )
}

export default CategoryLink
