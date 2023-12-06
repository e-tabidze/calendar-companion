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
      className={`${bg} border ${border} rounded-3xl  gap-4 p-7`}
    >
      <div className='flex items-center'>
        <Image src={icon} alt='' height={20} width={30} className='max-w-sm' />
        <Typography type='h3' className='font-bold text-smlg md:text-2xl ml-6'>
          {sum}
        </Typography>
      </div>

      <Typography type='h5' className="xl:ml-[56px]">{description}</Typography>
    </div>
  )
}

export default SumUp
