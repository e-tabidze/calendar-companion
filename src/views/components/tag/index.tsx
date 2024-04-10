import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import _ from 'lodash'
import {useTranslation} from "next-i18next";
import { dynamicTranslateTag } from 'src/utils/translationUtils'

interface Option {
  id: string | number
  title: string | number
  icon?: string
}

interface Props {
  title?: any
  component?: any
  height: 'h-10' | 'h-12'
  className?: string
  name?: string
  control?: any
  options?: Option[]
  label?: string
  handleClick?: any
  multiselect?: boolean
  append?: any
  outlined?: boolean,
  fullWidth?: boolean,
  errors?: any
}

const Tag: React.FC<Props> = ({
  title,
  component,
  height,
  className,
  name,
  control,
  options,
  label,
  handleClick,
  append,
  outlined,
  fullWidth,
  errors
}) => {
  const {t} = useTranslation()


  return (
    <>
      {control && name ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            const selectedOptions = Array.isArray(value) ? value : [value]

            return (
              <div className={`relative ${fullWidth? 'flex flex-col md:flex-row md:justify-between md:items-center w-full':''}`}>
                <div className="flex flex-col">
                  {title &&
                  <Typography type='h4' color='dark' className={`${fullWidth?'text-md mb-6 md:mb-0':'text-md md:text-3md mb-6'}`}>
                    {title}
                  </Typography>
                  }
                  {errors && (
                      <div id={name} className={`${fullWidth ?'md:-bottom-2 top-0 md:top-auto mt-6 md:mt-0':'top-0 mt-6 md:mt-7' } absolute left-0 text-sm text-red-100`}>
                        {t(_.get(errors, name)?.message)}
                      </div>
                  )}
                </div>

                <div className='flex flex-col'>
                  <div className='flex flex-wrap items-center gap-4'>
                    {options?.map(option => (
                      <div
                        key={option.id}
                        className={`flex items-center w-max ${height} ${component ? 'gap-3' : ''} ${
                          component ? 'rounded-xl' : 'rounded-2xl'
                        } ${
                          selectedOptions.includes(option.id)
                            ? outlined
                              ? 'border border-raisin-90 bg-green'
                              : 'border border-green-100 bg-green-100 '
                            : 'border border-gray-90 hover:border hover:border-raisin-30'
                        } ${outlined ? 'pl-2 pr-4' : 'px-4'}  cursor-pointer  ${className}`}
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
                        {component}
                        {option.icon && <Icon svgPath={option.icon} width='32' height='32' color= {selectedOptions.includes(option.id) ? '#549684' : '#000'} />}
                        <Typography
                          type='body'
                          className={`w-max ${option.icon && 'ml-2'} ${
                            selectedOptions.includes(option.id) && (!!outlined ? '' : 'text-white')
                          }`}
                        >
                          {dynamicTranslateTag(option.title, t)}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }}
        />
      ) : (
        <div
          className={`flex items-center gap-3 w-max ${height} px-4 cursor-pointer rounded-xl border border-raisin-10 hover:border-raisin-100 transition-all ${className}`}
          onClick={handleClick}
        >
          {component}
          <Typography type='body' className={`w-max`}>
            {label}
          </Typography>
        </div>
      )}
    </>
  )
}

export default Tag
