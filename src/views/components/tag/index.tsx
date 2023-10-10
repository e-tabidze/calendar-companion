import { Controller } from 'react-hook-form'
import Typography from '../typography'

interface Props {
  bg?: string
  component?: any
  height: 'h-10' | 'h-12'
  className?: string
  name: string
  control: any
  options: any[]
}

const Tag: React.FC<Props> = ({ bg, component, height, className, name, control, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          {options?.map(option => (
            <div
              key={option.id}
              className={`flex items-center w-max ${height} ${
                option.id === value ? (height === 'h-12' ? `${bg}` : 'bg-green-100') : `${bg}`
              }  ${component ? 'gap-3' : ''} ${component ? 'rounded-xl' : 'rounded-2xl'} ${
                option.id === value
                  ? height === 'h-12'
                    ? 'border border-raisin-90'
                    : 'border border-green-100'
                  : 'border border-gray-90'
              } px-4 cursor-pointer ${className}`}
              onClick={() => onChange(option.id)}
            >
              {component}
              <Typography
                type='body'
                className={`w-max ${option.id === value && (height === 'h-12' ? '' : 'text-white')}`}
              >
                {option.title}
              </Typography>
            </div>
          ))}
        </>
      )}
    />
  )
}

export default Tag
