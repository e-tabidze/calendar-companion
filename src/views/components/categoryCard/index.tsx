import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import _ from 'lodash'
import {useTranslation} from "next-i18next";
import { dynamicTranslateCategories } from 'src/utils/translationUtils'

interface Props {
  border?: boolean
  name: string
  control?: any
  options: any[]
  append?: any
  errors?: any
  title?: any
}

const CategoryCard: React.FC<Props> = ({ border, name, control, options, append, errors, title }) => {
 const {t} = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const selectedOptions = Array.isArray(value) ? value : [value]

        return (
          <>
              <div className="flex flex-col relative">
                  {title &&
                  <Typography type='h4' color='dark' className='mb-6'>
                      {title}
                  </Typography>
                  }
                  {errors && (
                      <div id={name} className='text-sm text-red-100 absolute left-0 bottom-0 mb-2'>
                          {t(_.get(errors, name)?.message)}
                      </div>
                  )}
              </div>
              <div className='flex flex-wrap gap-4 mb-10'>
                  {options?.map(option => (
                      <div
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
                          key={option.id}
                          className={`flex flex-col items-center justify-center cursor-pointer w-28 h-28 sm:w-36 sm:h-36 ${
                              border && 'border border-gray-20 rounded-2xl'
                          } ${selectedOptions.includes(option.id) ? 'border-2 border-green-100 bg-green-100/10' : 'hover:bg-green-100/10 border-2 hover:border-green-100'} `}
                      >
                          <Icon
                              svgPath={option.icon}
                              width='48'
                              height='48'
                              className='scale-[1.2]'
                              color={selectedOptions.includes(option.id) ? '#549684' : '#000'}
                          />
                          <Typography
                              type='body'
                              color={value === option.id ? 'dark' : 'light'}
                              className='text-2sm text-raisin-100'
                          >
                              {dynamicTranslateCategories(option.title, t)}
                          </Typography>
                      </div>
                  ))}
              </div>
          </>
        )
      }}
    />
  )
}

export default CategoryCard
