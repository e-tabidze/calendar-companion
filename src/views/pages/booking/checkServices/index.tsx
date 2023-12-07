import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Counter from 'src/views/components/counter'
import Typography from 'src/views/components/typography'

interface Option {
  id: string | number
  title: string | number
  icon?: string
  description?: string
  price?: string
  company_service_type_id?: any
}

interface Props {
  className?: string
  name?: string
  control?: any
  options?: Option[]
  label?: string
  handleClick?: any
  multiselect?: boolean
  append?: any
  width?: string
  height?: string
}

const CheckServices: React.FC<Props> = ({
  className,
  name,
  control,
  options,
  label,
  handleClick,
  append,
  width,
  height
}) => {
  return (
    <>
      {control && name ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            const selectedOptions = Array.isArray(value) ? value : [value]

            return (
              <>
                {options?.map(option => (
                  <div
                    className='flex items-center gap-4 cursor-pointer mb-4'
                    key={option.id}
                    onClick={() => {
                      if (append) {
                        if (selectedOptions.includes(option.id)) {
                          onChange(selectedOptions.filter(val => val !== option.id))
                        } else {
                          onChange([...selectedOptions, option.id])
                        }
                      } else {
                        onChange(option.id)
                      }
                    }}
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-[4px] border ${
                        selectedOptions.includes(option.id) ? 'border-green-100 bg-green-100' : 'border-raisin-10'
                      }`}
                    >
                      <Icon svgPath='check' height={10} width={14} className='fill-transparent' />
                    </span>
                    <input
                      type='checkbox'
                      value={value}
                      checked={selectedOptions.includes(option.id)}
                      className='absolute opacity-0 w-0 h-0'
                      onChange={() => {
                        if (append) {
                          if (selectedOptions.includes(option.id)) {
                            onChange(selectedOptions.filter(val => val !== option.id))
                          } else {
                            onChange([...selectedOptions, option])
                          }
                        } else {
                          onChange(option.id)
                        }
                      }}
                    />
                    {option.icon && <Icon svgPath={option.icon} width={width || 18} height={height || '18'} />}
                    <Typography type='body' className='w-max'>
                      {option.title}
                    </Typography>
                    <Typography type='subtitle' color='light' className='text-xs'>
                      {option.description}
                    </Typography>
                    <div
                      onClick={event => {
                        event.stopPropagation()
                      }}
                    >
                      <Counter name={'additional_services.count'} control={control} />
                    </div>

                    <Typography type='subtitle'>
                      {option.company_service_type_id === 1
                        ? `${option?.price !== null ? option.price : 0}/დღე`
                        : option.company_service_type_id === 2
                        ? `${option?.price !== null ? option.price : 0}/ფასი ერთჯერადად`
                        : option.company_service_type_id === 2
                        ? 'უფასო'
                        : ''}
                    </Typography>
                  </div>
                ))}
              </>
            )
          }}
        />
      ) : (
        <div
          className={`flex items-center gap-3 w-max
          px-4 cursor-pointer rounded-xl border border-raisin-10 ${className}`}
          onClick={handleClick}
        >
          <Typography type='body' className={`w-max `}>
            {label}
          </Typography>
        </div>
      )}
    </>
  )
}

export default CheckServices
