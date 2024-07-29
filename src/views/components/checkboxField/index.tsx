import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import { useTranslation } from 'next-i18next'
import _ from 'lodash'
import Divider from '../divider'

interface Option {
  id: string | number
  title: string | number | any
  icon?: string
}

interface Props {
  // classList?: string
  className?: string
  name?: string
  control?: any
  options?: Option[]
  label?: string
  handleClick?: any

  // multiselect?: boolean
  append?: any
  width?: string
  height?: string
  divider?: boolean
  cols?: boolean
  categoryCheckbox?: boolean
  errors?: any
}

const CheckboxField: React.FC<Props> = ({
  className,
  name,
  control,
  options,
  label,
  handleClick,
  append,
  width,
  height,
  divider,
  cols,
  categoryCheckbox,
  errors
}) => {
  const { t } = useTranslation()

  return (
    <>
      {control && name ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            const selectedOptions = Array.isArray(value) ? value : [value]

            return (
              <div className={cols ? 'grid grid-cols-2' : ''}>
                {options?.map((option, index) => (
                  <div className='' key={option.id}>
                    <div
                      className={`flex items-center gap-4 cursor-pointer transition-all ${
                        categoryCheckbox ? 'py-[4px] group hover:bg-raisin-5 px-5' : 'py-3'
                      }`}
                      onClick={() => {
                        if (append) {
                          if (selectedOptions.includes(option.id)) {
                            onChange(selectedOptions.filter(val => val !== option.id))
                          } else {
                            onChange([...selectedOptions, option.id])
                          }
                        } else {
                          // onChange(option.id)
                          if (selectedOptions.includes(option.id)) {
                            onChange('')
                          } else {
                            onChange(option.id)
                          }
                        }
                      }}
                    >
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded border ${
                          selectedOptions.includes(option.id)
                            ? 'border-purple-100 bg-purple-100 !fill-red-100'
                            : 'border-raisin-10'
                        }`}
                      >
                        <Icon
                          svgPath='check'
                          height={11}
                          width={11}
                          className={`fill-transparent ${selectedOptions.includes(option.id) ? 'fill-white' : ''}`}
                        />
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
                              onChange([...selectedOptions, option.id])
                            }
                          } else {
                            onChange(option.id)
                          }
                        }}
                      />
                      {option.icon && <Icon svgPath={option.icon} width={width || 18} height={height || '18'} />}
                      <Typography type='body' className='w-max text-sm lg:text-2sm'>
                        {option.title}
                      </Typography>
                    </div>
                    {_.get(errors, name)?.message && (
                      <div className='text-sm text-red-100 py-2 max-h-max relative'>
                        {t(_.get(errors, name)?.message)}
                      </div>
                    )}

                    {divider && index !== options.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
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

export default CheckboxField
