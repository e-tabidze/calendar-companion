import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

interface Props {
  icon: string
  label: string
  bg: 'bg-green-10' | 'bg-raisin-10'
  onClick: () => void
}

const Action: React.FC<Props> = ({ icon, label, bg, onClick }) => {

  return (
    <div className='flex flex-col items-center cursor-pointer' onClick={onClick}>
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${bg} mb-2`}>
        <Icon svgPath={icon} height={15} width={15} />
      </div>
      <Typography type='body'>{label}</Typography>
    </div>
  )
}

export default Action
