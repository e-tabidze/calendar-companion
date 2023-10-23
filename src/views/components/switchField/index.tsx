import Switcher from '../switcher'
import Typography from '../typography'

interface Props {
  label: string
  className?: string
  description?: string
  name: string
  control: any
  defaultValue?: any
}
const SwitchField: React.FC<Props> = ({ label, className, description, control, name, defaultValue }) => {
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
      <Switcher height='h-8' name={name} control={control} defaultValue={defaultValue} />
    </div>
  )
}

export default SwitchField
