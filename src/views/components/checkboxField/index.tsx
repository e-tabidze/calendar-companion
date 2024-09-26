import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import { useTranslation } from 'next-i18next'
import _ from 'lodash'
import Divider from '../divider'

interface Option {
  id: string | number
  summary: string | number | any
  icon?: string
  backgroundColor?: string
}

interface Props {
  name: string
  control?: any
  options?: Option[]
  append?: any
  width?: string
  height?: string
  divider?: boolean
  cols?: boolean
  errors?: any
  color?: string
  svgPath?: string
  handleClick?: () => void
}

const CheckboxField: React.FC<Props> = ({
  name,
  control,
  options,
  append,
  width,
  height,
  divider,
  cols,
  errors,
  svgPath,
  handleClick
}) => {
  const { t } = useTranslation()

  console.log(options, 'options')

  return (
    <>
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
                    className={`flex items-center gap-3 cursor-pointer transition-all py-2`}
                    onClick={() => {
                      if (append) {
                        if (selectedOptions.includes(option.id)) {
                          onChange(selectedOptions.filter(val => val !== option.id))
                        } else {
                          onChange([...selectedOptions, option.id])
                        }
                      } else {
                        if (selectedOptions.includes(option.id)) {
                          onChange('')
                        } else {
                          onChange(option.id)
                        }
                      }
                      handleClick && handleClick()
                    }}
                  >
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded border ${
                        selectedOptions.includes(option.id)
                          ? 'border-primary-100 bg-primary-100 !fill-red-100'
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
                    {svgPath && (
                      <Icon
                        svgPath={svgPath}
                        width={width || 18}
                        height={height || 18}
                        color={option.backgroundColor}
                      />
                    )}
                    <Typography type='body' className='w-max text-sm lg:text-2sm'>
                      {option.summary}
                    </Typography>
                  </div>
                  {_.get(errors, name)?.message && (
                    <ul className='list-disc ml-6 text-sm text-red-100 py-2 max-h-max relative'>
                      <li>{t(_.get(errors, name)?.message)}</li>
                    </ul>
                  )}

                  {divider && index !== options.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          )
        }}
      />
    </>
  )
}

export default CheckboxField
