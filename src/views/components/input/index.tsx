import { useState } from 'react'
import _ from 'lodash'

import { Controller } from 'react-hook-form'
import { InputContainer } from './styles'
import Icon from 'src/views/app/Icon'
import { useTranslation } from 'next-i18next'

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
  labelMobile?: string
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
  handleChange?: (e: any) => void
  placeholder?: string
  inputValue?: string
  min?: number
}

export const DefaultInput: React.FC<Props> = ({
  control,
  name = '',
  label,
  labelMobile,
  id,
  errors,
  pattern,
  disabled = false,
  rows,
  className,
  index,
  type = 'text',
  min
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const InputComponent = rows ? 'textarea' : 'input'

  const handleFocus = () => setIsFocused(true)

  const handleBlur = () => setIsFocused(false)

  const handleKeyDown = (e: any) => {
    e.stopPropagation()
    const { value } = e.target
    const badChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-.+,'

    if (value.length === 0 && e.key === '0') {
      return true
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.target.select()

      return true
    }

    if (badChars.indexOf(e.key) !== -1) {
      e.preventDefault()

      return false
    }
  }

  return (
    <InputContainer key={index} className={` flex flex-col ${className} ${disabled && styles.disabledInput}`}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            <label
              className={`${
                labelMobile && 'hidden md:flex'
              } absolute left-3 text-raisin-50 transition-all text-2sm pointer-events-none ${
                isFocused || value ? 'text-sm top-[3px]' : 'top-[18px] text-raisin-80'
              }`}
            >
              {label}
            </label>

            <label
              className={`md:hidden absolute left-3 text-raisin-50 transition-all text-2sm pointer-events-none ${
                isFocused || value ? 'text-sm top-[3px]' : 'top-[18px] text-raisin-80'
              }`}
            >
              {labelMobile}
            </label>
            <InputComponent
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              value={value || ''}
              className={`placeholder:text-[13px] ${rows ? 'pt-5 min-h-[80px]' : 'h-14'} ${styles.input} ${
                value || isFocused ? 'pb-1 pt-3' : 'pt-2 pb-2'
              } ${!disabled ? 'hover:border-raisin-30' : ''} ${
                _.get(errors, name)?.ref.name === name ? 'border border-red-100' : ''
              }`}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              onChange={e => {
                onChange(e)
              }}
              onKeyDown={type === 'number' ? handleKeyDown : (e) => e.stopPropagation()}
              pattern={pattern}
              rows={rows}
              min={min}
            />
            {_.get(errors, name)?.message && (
              <div id={id} className='text-sm text-red-100 py-2 max-h-max relative'>
                {t(_.get(errors, name)?.message)}
              </div>
            )}

            {type === 'password' && (
              <button type='button' onClick={togglePasswordVisibility} className='absolute right-3 transform top-4'>
                {showPassword ? (
                  <Icon svgPath='eye' width={24} height={24} />
                ) : (
                  <Icon svgPath='eye' width={24} height={24} />
                )}
              </button>
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

export const InputWithComponent: React.FC<Props> = ({
  label,
  className,

  // onComponentClick,
  name,
  control,
  errors,
  id
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)

  const handleBlur = () => setIsFocused(false)
  const { t } = useTranslation()

  return (
    <>
      <InputContainer
        className={`${className} h-12 lg:h-14 border border-raisin-10 rounded-xl px-3 py-2 flex items-center`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <label
                className={`absolute left-3 transition-all text-2sm pointer-events-none ${
                  isFocused || value ? 'text-sm text-raisin-50 top-1' : 'text-2sm text-raisin-80 top-4'
                }`}
              >
                {label}
              </label>
              <input
                className='overflow-hidden text-ellipsis whitespace-nowrap inline-block pr-3 focus:border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 h-full w-full'
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type='text'
                onChange={e => onChange(e)}
              />
              {errors && (
                <div id={id} className='text-sm text-red-100 absolute -bottom-5'>
                  {t(_.get(errors, name)?.message)}
                </div>
              )}
            </>
          )}
        />
        {/* <div className='flex items-center gap-3 h-full border-l border-raisin-10 px-5 cursor-pointer'>
          <Icon svgPath='map' width={24} height={24} className='fill-transparent' onClick={onComponentClick} />
          <Typography type='subtitle' className='hidden sm:flex'>
            რუკაზე
          </Typography>
        </div> */}
      </InputContainer>
    </>
  )
}
