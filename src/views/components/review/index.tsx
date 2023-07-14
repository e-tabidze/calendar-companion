import Image from '../image'
import Typography from '../typography'

interface Props {
  review: number
  className?: string
  size: 'large' | 'normal'
}

const Review = ({ review, className, size }: Props) => {
  return (
    <div
      className={`shadow-md bg-white flex items-center ${
        size === 'large' ? 'gap-3 px-4 py-2' : 'gap-2 px-2 py-[7px]'
      }  rounded-full w-fit h-fit ${className}`}
    >
      <Image src='/icons/star.svg' alt='' />
      <Typography
        type='body'
        className={`${size === 'large' ? 'font-bold text-md' : 'font-normal text-sm'}`}
      >
        {review}
      </Typography>
    </div>
  )
}
export default Review
