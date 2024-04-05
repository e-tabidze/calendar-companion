import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

interface Props {
  icon: string
  label: string
  bg: 'bg-green-10' | 'bg-raisin-10'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Action: React.FC<Props> = ({ icon, label, bg, onClick, disabled, className }) => {

  return (
    <div className={`flex gap-4 md:flex-col md:gap-0 items-center ${disabled ? 'cursor-not-allowed opacity-60 pointer-events-none' : 'cursor-pointer '} cursor-pointer ${className}`} onClick={onClick}>
      <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg ${bg} md:mb-2`}>
        <Icon svgPath={icon} height={20} width={20} />
      </div>
      <Typography type='body' className="text-2sm whitespace-nowrap">{label}</Typography>
    </div>
  )
}

export default Action
