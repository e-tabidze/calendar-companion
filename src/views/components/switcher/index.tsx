import { Controller } from 'react-hook-form'

interface Props {
  height: 'h-5' | 'h-8'
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
              height === 'h-8' ? 'w-14' : 'w-8'
            } relative bg-raisin-30 peer-focus:outline-none peer-focus:none peer-focus:none dark:peer-focus:ring-green-110 rounded-full peer dark:bg-gray-700 ${
              height === 'h-8' ? 'peer-checked:after:translate-x-full' : 'peer-checked:after:translate-x-[75%]'
            } peer-checked:after:border-white after:content-[''] after:absolute ${
              height === 'h-8' ? 'after:top-[3.5px] after:left-1' : 'after:top-[2px] after:left-[2px]'
            }  after:bg-white after:border-gray-300 after:border after:rounded-full ${
              height === 'h-8' ? 'after:h-6 after:w-6' : 'after:h-4 after:w-4'
            } after:transition-all dark:border-gray-600 peer-checked:bg-green-100`}
          ></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-110'></div>
        </label>
      )}
    />
  )
}

export default Switcher
