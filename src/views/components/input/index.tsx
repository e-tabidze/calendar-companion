import Image from 'next/image'
import { useState } from 'react'
import Typography from '../typography'
import _ from 'lodash'

import { Controller } from 'react-hook-form'
import { InputContainer } from './styles'

const styles = {
  disabledInput: 'opacity-80',
  input:
    'w-full rounded-xl px-3 text-2sm text-raisin-100 border border-raisin-10 focus:border-raisin-100 focus:outline-none placeholder:text-raisin-100 placeholder:text-2sm placeholder:text-raisin-50 placeholder:text-2sm focus:placeholder-opacity-0',
  label: 'text-sm absolute left-3 text-raisin-50 focus:top-2'
}

interface Props {
  control?: any
  name: string
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
  placeholder?: string
}

export const DefaultInput: React.FC<Props> = ({
  control,
  name = '',
  label,
  id,
  errors,
  pattern,
  disabled = false,
  rows,
  className,
  index,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const InputComponent = rows ? 'textarea' : 'input'

  const handleFocus = () => setIsFocused(true)

  const handleBlur = () => setIsFocused(false)

  return (
    <InputContainer key={index} className={`${className} ${disabled && styles.disabledInput}`}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            <label
              className={`absolute left-3 ${
                isFocused || value ? 'text-sm text-raisin-50 top-[2px]' : 'hidden'
              }`}
            >
              {label}
            </label>
            <InputComponent
              placeholder={label}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              value={value || ''}
              className={`${rows ? 'pt-4' : 'h-12'} ${styles.input} ${value || isFocused ? 'pb-1 pt-4' : 'pt-2 pb-2'} ${!disabled ? 'hover:border-raisin-30' : ''} ${
                _.get(errors, name)?.ref.name === name ? 'border border-red-100' : ''
              }`}
              type='text'
              onChange={e => {
                onChange(e)
              }}
              pattern={pattern}
              rows={rows}
            />
            {errors && (
              <div id={id} className='text-sm text-red-100 ml-2'>
                {_.get(errors, name)?.message}
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

export const InputWithComponent: React.FC<Props> = ({ label, className, onComponentClick, name, control }) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => setIsFocused(true)

  const handleBlur = () => setIsFocused(false)

  return (
    <InputContainer className={`${className} h-14 border border-raisin-10 rounded-xl px-3 py-2 flex items-center`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <label
              className={`absolute left-3 ${
                isFocused || value ? 'text-sm text-raisin-50 top-0' : 'text-2sm text-raisin-80 top-4'
              }`}
            >
              {label}
            </label>
            <input
              className='focus:border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 h-full w-full'
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type='text'
              onChange={e => {
                onChange(e)
              }}
            />
          </>
        )}
      />
      <div className='flex items-center gap-3 w-fit absolute h-full right-0 top-0 border-l border-raisin-10 px-5 cursor-pointer'>
        <Image src='/icons/map.svg' alt='' height={24} width={24} onClick={onComponentClick} />
        <Typography type='subtitle'>რუკაზე</Typography>
      </div>
    </InputContainer>
  )
}
