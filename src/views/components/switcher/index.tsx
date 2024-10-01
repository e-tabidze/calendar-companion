import { Controller } from 'react-hook-form'

interface Props {
  height: 'h-[14px]' | 'h-[17px]'
  name: string
  control: any
  defaultValue?: boolean
  onChangeCallback?: () => void
}
const Switcher: React.FC<Props> = ({ height, name, control, defaultValue, onChangeCallback }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            checked={!!value}
            type='checkbox'
            value={value}
            className='sr-only peer'
            onChange={() => {
              onChange(!value)
              if (onChangeCallback) {
                onChangeCallback()
              }
            }}
          />

          <div
            className={`${height} ${
              height === 'h-[14px]' ? 'w-[24px]' : 'w-[30px]'
            } relative bg-raisin-30 peer-focus:outline-none peer-focus:none peer-focus:none dark:peer-focus:ring-green-110 rounded-full peer dark:bg-gray-700 ${
              height === 'h-[14px]' ? 'peer-checked:after:translate-x-full' : 'peer-checked:after:translate-x-[100%]'
            } peer-checked:after:border-white after:content-[''] after:absolute ${
              height === 'h-[14px]' ? 'after:top-[2.5px] after:left-[3px]' : 'after:top-[3px] after:left-[4px]'
            }  after:bg-white after:border-gray-300 after:border after:rounded-full ${
              height === 'h-[14px]' ? 'after:h-[9px] after:w-[9px]' : 'after:h-[11px] after:w-[11px]'
            } after:transition-all dark:border-gray-600 peer-checked:bg-green-90`}
          ></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-110'></div>
        </label>
      )}
    />
  )
}

export default Switcher
