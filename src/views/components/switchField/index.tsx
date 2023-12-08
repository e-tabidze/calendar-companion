import Switcher from '../switcher'
import Typography from '../typography'

interface Props {
  label: string
  className?: string
  description?: string
  name: string
  control: any
  defaultValue?: any
  onChangeCallback?: () => void
}
const SwitchField: React.FC<Props> = ({ label, className, description, control, name, defaultValue, onChangeCallback }) => {
  return (
    <div className={`flex justify-between items-center w-full ${className}`}>
      <div>
        <Typography type='subtitle' color='dark' className="text-md">
          {label}
        </Typography>
        {description && (
          <Typography type='body' color='light'>
            {description}
          </Typography>
        )}
      </div>
      <Switcher height='h-8' name={name} control={control} defaultValue={defaultValue} onChangeCallback={onChangeCallback}/>
    </div>
  )
}

export default SwitchField
