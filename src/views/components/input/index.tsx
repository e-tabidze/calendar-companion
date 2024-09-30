import { useState } from 'react'
import _ from 'lodash'

import { Controller } from 'react-hook-form'
import { InputContainer } from './styles'
import Icon from 'src/views/app/Icon'
import { useTranslation } from 'next-i18next'

const styles = {
  disabledInput: 'opacity-80',
  input: 'w-full bg-grey-70 rounded-xl px-3 text-md font-medium text-raisin-130 focus:outline-none  tracking-wider',
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
  onBlur?: any
  boldPlaceholder?: boolean
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
  min,
  onBlur
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

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
  const handleEnglishLetters = (e: any) => {
    e.stopPropagation()
    const { value } = e.target
    const georgianChars = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ'

    if (value.length === 0 && e.key === '0') {
      return true
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.target.select()

      return true
    }

    if (georgianChars.indexOf(e.key) !== -1) {
      e.preventDefault()

      return false
    }
  }

  return (
    <InputContainer key={index} className={`flex flex-col ${className} ${disabled && styles.disabledInput}`}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            <label
              className={`${
                labelMobile && 'hidden md:flex'
              } bg-transparent w-[calc(100%-24px)] absolute left-3 text-raisin-40 font-medium tracking-wide transition-all text-md pointer-events-none ${
                isFocused || value ? 'text-sm top-[1px] pt-[2px]' : 'top-[18px] text-raisin-40'
              }`}
            >
              {label}
            </label>

            <label
              className={`md:hidden bg-white w-[calc(100%-24px)] absolute left-3 text-raisin-40 font-medium tracking-wide transition-all text-2sm pointer-events-none ${
                isFocused || value ? 'text-sm top-[1px] pt-[2px]' : 'top-[18px] text-raisin-80'
              }`}
            >
              {labelMobile}
            </label>
            <InputComponent
              onFocus={handleFocus}
              onBlur={() => {
                handleBlur()
                onBlur && onBlur()
              }}
              disabled={disabled}
              value={value || ''}
              className={`placeholder:text-md placeholder:text-raisin-40 placeholder:font-medium ${
                rows ? 'pt-5 min-h-[80px]' : 'h-14'
              } ${styles.input} ${value || isFocused ? 'pb-1 pt-3' : 'pt-2 pb-2'} ${
                !disabled ? 'hover:border-raisin-30' : ''
              } ${_.get(errors, name)?.ref?.name === name ? 'bg-red-15' : ''}`}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : ''}
              onChange={e => {
                onChange(e)
              }}
              onKeyDown={
                type === 'number' ? handleKeyDown : type === 'english' ? handleEnglishLetters : e => e.stopPropagation()
              }
              pattern={pattern}
              rows={rows}
              min={min}
            />
            {_.get(errors, name)?.message && (
              <ul id={id} className='list-disc ml-6 text-sm text-red-100 py-2 max-h-max relative'>
                <li>{t(_.get(errors, name)?.message)}</li>
              </ul>
            )}

            {type === 'password' && (
              <button type='button' onClick={togglePasswordVisibility} className='absolute right-3 transform top-4'>
                {showPassword ? (
                  <Icon svgPath='eye' width={24} height={24} />
                ) : (
                  <Icon svgPath='eyeHidden' width={24} height={24} />
                )}
              </button>
            )}
          </>
        )}
      />
    </InputContainer>
  )
}

export const EventInput: React.FC<Props> = ({
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
  min,
  onBlur,
  placeholder,
  boldPlaceholder
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

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
  const handleEnglishLetters = (e: any) => {
    e.stopPropagation()
    const { value } = e.target
    const georgianChars = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ'

    if (value.length === 0 && e.key === '0') {
      return true
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.target.select()

      return true
    }

    if (georgianChars.indexOf(e.key) !== -1) {
      e.preventDefault()

      return false
    }
  }

  return (
    <InputContainer key={index} className={`flex flex-col ${className} ${disabled && styles.disabledInput}`}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <>
            {/* <label
              className={`${
                labelMobile && 'hidden md:flex'
              } bg-transparent w-[calc(100%-24px)] absolute left-3 text-raisin-40 font-medium tracking-wide transition-all text-md pointer-events-none ${
                isFocused || value ? 'text-sm top-[1px] pt-[2px]' : 'top-[18px] text-raisin-40'
              }`}
            >
              {label}
            </label>

            <label
              className={`md:hidden bg-white w-[calc(100%-24px)] absolute left-3 text-raisin-40 font-medium tracking-wide transition-all text-2sm pointer-events-none ${
                isFocused || value ? 'text-sm top-[1px] pt-[2px]' : 'top-[18px] text-raisin-80'
              }`}
            >
              {labelMobile}
            </label> */}
            <InputComponent
              onFocus={handleFocus}
              onBlur={() => {
                handleBlur()
                onBlur && onBlur()
              }}
              placeholder={placeholder}
              disabled={disabled}
              value={value || ''}
              className={`placeholder:text-md placeholder:text-raisin-40 ${boldPlaceholder ? 'placeholder:font-bold placeholder:text-3md' : ''}  ${
                rows ? 'pt-5 min-h-[80px]' : 'h-14'
              } ${
                !disabled ? 'hover:border-raisin-30' : ''
              } ${_.get(errors, name)?.ref?.name === name ? 'bg-red-15' : ''}`}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : ''}
              onChange={e => {
                onChange(e)
              }}
              onKeyDown={
                type === 'number' ? handleKeyDown : type === 'english' ? handleEnglishLetters : e => e.stopPropagation()
              }
              pattern={pattern}
              rows={rows}
              min={min}
            />
            {_.get(errors, name)?.message && (
              <ul id={id} className='list-disc ml-6 text-sm text-red-100 py-2 max-h-max relative'>
                <li>{t(_.get(errors, name)?.message)}</li>
              </ul>
            )}

            {type === 'password' && (
              <button type='button' onClick={togglePasswordVisibility} className='absolute right-3 transform top-4'>
                {showPassword ? (
                  <Icon svgPath='eye' width={24} height={24} />
                ) : (
                  <Icon svgPath='eyeHidden' width={24} height={24} />
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
