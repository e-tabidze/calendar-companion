// import React from 'react'
// import { Controller } from 'react-hook-form'
// import Icon from 'src/views/app/Icon'
// import Typography from '../typography'

// interface Option {
//   id: string | number;
//   title: string | number;
//   icon?: string;
// }
// interface Props {
//   iconPath?: string
//   name: string
//   control: any
//   append?: () => void
//   title: string
//   remove?: () => any
//   customValue: any
//   options: Option[]
//   hand
// }

// const CheckboxField: React.FC<Props> = ({ iconPath, name, control, title, remove, append, customValue }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value } }) => (
//         <label htmlFor={title} className='flex gap-7 items-center'>
//           <>{console.log(value, 'value', customValue, 'custom')}</>
//           <input
//             // src-only={value?.toString()}
//             // type='checkbox'
//             value={customValue}
//             // className='accent-green-100 relative w-5 h-5 rounded-lg'
//             // checked={value}
//             // onChange={append ? append : onChange}
//             onChange={append ? append : () => (value ? remove && remove() : onChange)}
//             // onChange={onChange}
//           />
//           {iconPath ? <Icon svgPath={iconPath} className='w-12' width={20} height={20} /> : null}
//           <Typography type='button' color='dark' weight='normal'>
//             {title}
//           </Typography>
//         </label>
//       )}
//     />
//   )
// }

// export default CheckboxField

import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'

interface Option {
  id: string | number
  title: string | number
  icon?: string
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

const CheckboxField: React.FC<Props> = ({
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
                  <div className='flex items-center gap-4' key={option.id}>
                    {/* <div
                      key={option.id}
                      className={` ${
                        selectedOptions.includes(option.id) ? 'bg-raisin-80' : ''
                      } flex items-center w-4 h-4 border border-raisin-110 cursor-pointer ${className}`}
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
                    ></div> */}
                    <input
                      type='checkbox'
                      value={value}
                      checked={selectedOptions.includes(option.id)}
                      className={` ${
                        selectedOptions.includes(option.id) ? 'bg-raisin-80' : ''
                      } flex items-center w-4 h-4 border border-raisin-110 cursor-pointer ${className}`}
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
                    <Typography type='body' className='w-max'>
                      {option.title}
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

export default CheckboxField
