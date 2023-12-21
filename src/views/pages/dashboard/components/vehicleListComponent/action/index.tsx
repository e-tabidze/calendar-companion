import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

interface Props {
  icon: string
  label: string
  bg: 'bg-green-10' | 'bg-raisin-10'
  onClick?: () => void
  disabled?: boolean
}

const Action: React.FC<Props> = ({ icon, label, bg, onClick, disabled }) => {

  return (
    <div className={`flex flex-col items-center ${disabled ? 'cursor-not-allowed opacity-60 pointer-events-none' : 'cursor-pointer '} cursor-pointer`} onClick={onClick}>
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${bg} mb-2`}>
        <Icon svgPath={icon} height={20} width={20} />
      </div>
      <Typography type='body' className="text-2sm">{label}</Typography>
    </div>
  )
}

export default Action
