import dynamic from 'next/dynamic'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
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
      className={`${bg} border ${border} rounded-3xl  gap-4 p-6 md:p-8`}
    >
      <div className='flex items-center'>
        <Icon svgPath={icon} height={24} width={24} className='max-w-sm' />
        <Typography type='h3' className='font-bold text-2lg md:text-2xl ml-6'>
          {sum}
        </Typography>
      </div>

      <Typography type='h5' className="xl:ml-[56px]">{description}</Typography>
    </div>
  )
}

export default SumUp
