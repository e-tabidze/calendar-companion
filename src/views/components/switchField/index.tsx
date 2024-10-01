import Switcher from '../switcher'
import Typography from '../typography'

interface Props {
  height: 'h-[14px]' | 'h-[17px]'
  label: string
  className?: string
  description?: string
  name: string
  control: any
  defaultValue?: any
  onChangeCallback?: () => void
  reversed?: boolean
}
const SwitchField: React.FC<Props> = ({
  reversed,
  label,
  className,
  description,
  control,
  name,
  defaultValue,
  onChangeCallback,
  height
}) => {
  return (
    <div
      className={`flex items-center ${className} ${
        reversed ? 'flex-row-reverse gap-2 justify-end' : 'w-full justify-between'
      }`}
    >
      <div>
        <Typography type='subtitle' color='dark' className='text-sm'>
          {label}
        </Typography>
        {description && (
          <Typography type='body' color='light'>
            {description}
          </Typography>
        )}
      </div>
      <Switcher
        height={height}
        name={name}
        control={control}
        defaultValue={defaultValue}
        onChangeCallback={onChangeCallback}
      />
    </div>
  )
}

export default SwitchField
