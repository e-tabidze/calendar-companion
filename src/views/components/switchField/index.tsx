import Switcher from '../switcher'
import Typography from '../typography'

interface Props {
  label: string
  onChange: () => void
  value: boolean
  className?: string
  description?: string
}
const SwitchField: React.FC<Props> = ({ label, onChange, value, className, description }) => {
  return (
    <div className={`flex justify-between items-center w-full ${className}`}>
      <div>
        <Typography type='subtitle' color='dark'>
          {label}
        </Typography>
        {description && (
          <Typography type='body' color='light'>
            {description}
          </Typography>
        )}
      </div>
      <Switcher height='h-8' onChange={onChange} value={value} />
    </div>
  )
}

export default SwitchField
