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
  reversed?:boolean
}
const SwitchField: React.FC<Props> = ({ reversed, label, className, description, control, name, defaultValue, onChangeCallback }) => {
  return (
    <div className={`flex items-center  ${className} ${reversed?'flex-row-reverse gap-4 justify-self-start':'w-full justify-between'}`}>
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
