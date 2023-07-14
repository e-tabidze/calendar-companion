import Image from 'next/image'
import { useState } from 'react'
import Typography from '../typography'
import { InputContainer } from './styles'

export const DefaultInput = ({ label, value, className, onChange, ...rest }: any) => {
  const [isFocused, setIsFocused] = useState((value && value?.length > 0) || false)
  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: { target: { value: string | any[] } }) => {
    setIsFocused(e.target.value.length > 0 ? true : false)
  }
  const labelClasses = isFocused
    ? 'text-sm absolute top-3 -translate-y-1/2 transition-transform'
    : 'text-sm absolute top-1/2 transform -translate-y-1/2 transition-transform'

  return (
    <InputContainer className={className}>
      {isFocused && <label className={`${labelClasses} left-3 text-raisin-50`}>{label}</label>}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-14 rounded-xl px-3 py-2 ${
          isFocused ? 'pt-4' : ''
        } text-sm text-raisin-100 border border-raisin-10 focus:border-raisin-100 focus:outline-none placeholder:text-raisin-100 placeholder:text-2sm ${className}`}
        placeholder={isFocused ? '' : label}
        type='text'
        value={value}
        onChange={onChange}
        {...rest}
      />
    </InputContainer>
  )
}

export const MultilineInput = ({ label, value, className, onChange, rows, ...rest }: any) => {
  const [isFocused, setIsFocused] = useState((value && value?.length > 0) || false)
  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: { target: { value: string | any[] } }) => {
    setIsFocused(e.target.value.length > 0 ? true : false)
  }
  const labelClasses = isFocused
    ? 'text-sm absolute top-3 -translate-y-1/2 transition-transform'
    : 'text-sm absolute top-1/2 transform -translate-y-1/2 transition-transform'

  return (
    <div className={`relative ${className}`}>
      {isFocused && <label className={`${labelClasses} left-3 text-raisin-50`}>{label}</label>}
      <textarea
        className={`w-full pt-5 rounded-lg px-3 py-2 text-sm text-raisin-100 border border-raisin-10 focus:border-raisin-100 focus:outline-none placeholder:text-raisin-100 placeholder:text-2sm ${className}`}
        placeholder={isFocused ? '' : label}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        rows={rows}
        {...rest}
      />
    </div>
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

export const InputWithComponent = ({ label, value, className, onChange, onComponentClick, ...rest }: any) => {
  const [isFocused, setIsFocused] = useState((value && value?.length > 0) || false)
  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: { target: { value: string | any[] } }) => {
    setIsFocused(e.target.value.length > 0 ? true : false)
  }
  const labelClasses = isFocused
    ? 'text-sm absolute top-3 -translate-y-1/2 transition-transform'
    : 'text-sm absolute top-1/2 transform -translate-y-1/2 transition-transform'

  return (
    <InputContainer className={`${className}`}>
      {isFocused && <label className={`${labelClasses} left-3 text-raisin-50`}>{label}</label>}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-14 rounded-xl px-3 py-2 ${
          isFocused ? 'pt-4' : ''
        } text-sm text-raisin-100 border border-raisin-10 focus:border-raisin-100 focus:outline-none placeholder:text-raisin-100 placeholder:text-2sm ${className}`}
        placeholder={isFocused ? '' : label}
        type='text'
        value={value}
        onChange={onChange}
        {...rest}
      />
      <div className='flex items-center gap-3 w-fit absolute h-full right-0 top-0 border-l border-raisin-10 px-5 cursor-pointer'>
        <Image src='/icons/map.svg' alt='' height={24} width={24} onClick={onComponentClick} />
        <Typography type='subtitle'>რუკაზე</Typography>
      </div>
    </InputContainer>
  )
}
