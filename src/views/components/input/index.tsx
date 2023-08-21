import Image from 'next/image'
import { useState } from 'react'
import Typography from '../typography'
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

import { Controller } from 'react-hook-form'
import { InputContainer } from './styles'

const styles = {
  disabledInput: 'opacity-80',
  input:
    'w-full rounded-xl px-3 py-2 text-sm text-raisin-100 border border-raisin-10 focus:border-raisin-100 focus:outline-none placeholder:text-raisin-100 placeholder:text-2sm',
  label: 'text-sm absolute left-3 text-raisin-50 focus:top-2'
}

interface Props {
  control?: any
  name?: string
  label?: string
  id?: any
  prefix?: string
  errors?: any
  pattern?: any
  type?: string
  disabled?: boolean
  inputStyles?: string
  valueSelectorFunction?: any
  innerButton?: boolean
  innerButtonText?: string
  innerButtonOnClick?: any
  rows?: number
  className?: string
  index?: number
  setError?: () => void
  clearErrors?: any
  onComponentClick?: () => void
  value?: string
  onChange?: (e: any) => void
}

export const DefaultInput: React.FC<Props> = ({
  control,
  name,
  label,
  id,
  prefix,
  errors,
  pattern,
  type,
  disabled = false,
  inputStyles = '',
  valueSelectorFunction,
  innerButton = false,
  innerButtonText = '',
  innerButtonOnClick = (e: any) => console.log(e),
  rows,
  className,
  index,
  setError,
  clearErrors
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const InputComponent = rows ? 'textarea' : 'input'

  // const handleFocus = () => {
  //   setIsFocused(true)
  // }

  const handleBlur = () => {
    setIsFocused(false)
  }

  // const labelClasses = `text-sm absolute -translate-y-1/2 transition-transform ${
  //   rows ? (isFocused || hasValue ? 'top-3' : 'top-6') : isFocused || hasValue ? 'top-3' : 'top-1/2'
  // }`

  // const labelClasses = `text-sm absolute left-3 text-raisin-50`

  return (
    <InputContainer key={index} className={`${className} ${disabled && styles.disabledInput}`}>
      <Controller
        control={control}
        name={name || ''}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            <label
              // className={`${styles.label} ${
              //   rows ? (isFocused || value ? 'top-3' : 'top-1/2') : isFocused || value ? 'top-3' : 'top-1/2'
              // }`}
              className={`${styles.label} `}
            >
              {label}
            </label>
            <InputComponent
              // onFocus={e => {
              //   handleFocus()
              // }}
              disabled={disabled}
              value={value || ''}
              className={` ${rows ? '' : 'h-14'} ${styles.input} ${errors[name || ''] && 'border border-red-100'}`}
              type='text'
              onChange={e => {
                onChange(e)
              }}
              pattern={pattern}
              rows={rows}
            />
            {errors[name || ''] && (
              <div id={id} className='text-sm text-red-100'>
                {errors[name || ''] ? errors[name || ''].message : 'აუცილებელი ველი'}
              </div>
            )}
          </>
        )}
      />
    </InputContainer>
  )
}

export const FileInput = ({ type, accept, className, onChange, ...rest }: any) => {
  return (
    <input
      type={type}
      accept={accept}
      multiple
      className={`sr-only w-full h-full z-20 ${className}`}
      onChange={onChange}
      {...rest}
    />
  )
}

export const PasswordInput = ({ label, value, className, onChange, ...rest }: any) => {
  const [isFocused, setIsFocused] = useState((value && value?.length > 0) || false)
  const [showPassword, setShowPassword] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: any) => {
    setIsFocused(e.target.value.length > 0)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const labelClasses = isFocused
    ? 'text-sm z-10 absolute top-3 -translate-y-1/2 transition-transform'
    : 'text-sm absolute top-1/2 transform -translate-y-1/2 transition-transform'

  return (
    <InputContainer>
      {isFocused && <label className={`${labelClasses} left-3 text-raisin-50`}>{label}</label>}
      <div className='relative'>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full h-14 rounded-xl px-3 py-2 ${
            isFocused ? 'pt-4' : ''
          } text-sm text-raisin-100 border border-raisin-10 focus:border-raisin-100 focus:outline-none placeholder:text-raisin-100 placeholder:text-2sm ${className}`}
          placeholder={isFocused ? '' : label}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          {...rest}
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute top-1/2 right-3 transform -translate-y-1/2'
        >
          {showPassword ? (
            <Image src='/icons/eye.svg' alt='' height={24} width={24} />
          ) : (
            <Image src='/icons/eye.svg' alt='' height={24} width={24} />
          )}
        </button>
      </div>
    </InputContainer>
  )
}

// export const InputWithComponent: React.FC<Props> = ({
//   label,
//   id,
//   prefix,
//   pattern,
//   type,
//   disabled = false,
//   inputStyles = '',
//   valueSelectorFunction,
//   innerButton = false,
//   innerButtonText = '',
//   innerButtonOnClick = (e: any) => console.log(e),
//   rows,
//   className,
//   index,
//   setError,
//   clearErrors,
//   onComponentClick,
//   name,
//   control
// }) => {
//   const [isFocused, setIsFocused] = useState(false)
//   const handleFocus = () => {
//     setIsFocused(true)
//   }

//   const handleBlur = (e: { target: { value: string | any[] } }) => {
//     setIsFocused(e.target.value.length > 0 ? true : false)
//   }
//   const labelClasses = isFocused
//     ? 'text-sm absolute top-3 -translate-y-1/2 transition-transform'
//     : 'text-sm absolute top-1/2 transform -translate-y-1/2 transition-transform'

//   return (
//     <InputContainer className={`${className} h-14 border border-raisin-10 rounded-xl px-3 py-2 flex items-center`}>
//       {isFocused && <label className={`${labelClasses} left-3 text-raisin-50`}>{label}</label>}
//       <Controller
//         name={name || ""}
//         control={control}
//         rules={{ required: true }}
//         render={({ field: { onChange, value } }) => (
//           <>
//             <label
//               // className={`${styles.label} ${
//               //   rows ? (isFocused || value ? 'top-3' : 'top-1/2') : isFocused || value ? 'top-3' : 'top-1/2'
//               // }`}
//               className={`${styles.label} focus:border-none focus-visible:border-none`}
//             >
//               {label}
//             </label>
//             <input
//               // onFocus={e => {
//               //   handleFocus()
//               // }}
//               className='focus:border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 h-full w-full'
//               disabled={disabled}
//               value={value || ''}
//               // className={` ${rows ? '' : 'h-14'} ${styles.input} ${errors[name] && 'border border-red-100'}`}
//               type='text'
//               onChange={e => {
//                 onChange(e)
//               }}
//               pattern={pattern}
//             />
//           </>
//         )}
//       />
//       <div className='flex items-center gap-3 w-fit absolute h-full right-0 top-0 border-l border-raisin-10 px-5 cursor-pointer'>
//         <Image src='/icons/map.svg' alt='' height={24} width={24} onClick={onComponentClick} />
//         <Typography type='subtitle'>რუკაზე</Typography>
//       </div>
//     </InputContainer>
//   )
// }

export const InputWithComponent: React.FC<Props> = ({
  label,
  value,
  onChange,
  onComponentClick,
  className,
  disabled,
  pattern
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: { target: { value: string | any[] } }) => {
    setIsFocused(e.target.value.length > 0)
  }

  const labelClasses = isFocused
    ? 'text-sm absolute top-3 -translate-y-1/2 transition-transform'
    : 'text-sm absolute top-1/2 transform -translate-y-1/2 transition-transform'

  return (
    <InputContainer className={`${className} h-14 border border-raisin-10 rounded-xl px-3 py-2 flex items-center`}>
      {isFocused && <label className={`${labelClasses} left-3 text-raisin-50`}>{label}</label>}

      <>
        <label
          // className={`${styles.label} ${
          //   rows ? (isFocused || value ? 'top-3' : 'top-1/2') : isFocused || value ? 'top-3' : 'top-1/2'
          // }`}
          className={`${styles.label} focus:border-none focus-visible:border-none`}
        >
          {label}
        </label>
        <input
          // onFocus={e => {
          //   handleFocus()
          // }}
          className='focus:border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 h-full w-full'
          disabled={disabled}
          value={value || ''}
          // className={` ${rows ? '' : 'h-14'} ${styles.input} ${errors[name] && 'border border-red-100'}`}
          type='text'
          onChange={onChange}
          pattern={pattern}
        />
      </>
      <div className='flex items-center gap-3 w-fit absolute h-full right-0 top-0 border-l border-raisin-10 px-5 cursor-pointer'>
        <Image src='/icons/map.svg' alt='' height={24} width={24} onClick={onComponentClick} />
        <Typography type='subtitle'>რუკაზე</Typography>
      </div>
    </InputContainer>
  )
}
