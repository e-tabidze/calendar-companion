import Image from 'next/image'
import Typography from 'src/views/components/typography'

interface Props {
  icon: string
  label: string
  bg: 'bg-green-10' | 'bg-raisin-10'
}

const Action: React.FC<Props> = ({ icon, label, bg }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${bg} mb-2`}>
        <Image src={icon} alt='' height={15} width={15} />
      </div>
      <Typography type='body'>{label}</Typography>
    </div>
  )
}

export default Action
