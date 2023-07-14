import Image from 'next/image'
import Typography from 'src/views/components/typography'

interface Props {
  border: string
  bg: string
  icon: string
  sum: number
  description: string
}

const SumUp: React.FC<Props> = ({ border, bg, icon, sum, description }) => {
  return (
    <div
      className={`${bg} border ${border} rounded-3xl grid grid-cols-[min-content,max-content] gap-4 p-7`}
    >
      <div className='flex'>
        <Image src={icon} alt='' height={20} width={30} className='max-w-sm' />
      </div>
      <Typography type='h3' className='font-bold text-3lg large:text-2xl'>
        {sum}
      </Typography>
      <div></div>
      <Typography type='h5'>{description}</Typography>
    </div>
  )
}

export default SumUp
