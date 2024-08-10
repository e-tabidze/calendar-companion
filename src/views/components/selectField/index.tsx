import React from 'react'
import { Controller } from 'react-hook-form'
import Select, { ClearIndicatorProps, components, DropdownIndicatorProps, GroupBase } from 'react-select'
import _ from 'lodash'
import Icon from 'src/views/app/Icon'
import { useTranslation } from 'next-i18next'

interface Option {
  [key: string]: any
}

interface Props {
  placeholder?: string
  options: Option[]
  disabled?: boolean
  className?: string
  icon?: boolean
  control: any
  name: string
  valueKey: string
  labelKey: string
  errors?: any
  isMulti?: boolean
  handleChange?: () => void
  errorAbsolute?: boolean
  errorRight?: boolean
  setValueLabel?: any
  hideBorder?: boolean
  isSearchable?: boolean
}

const Control = ({ children, ...props }: any) => {
  const { emoji } = props.selectProps
  const style = { cursor: 'pointer' }

  return (
    <components.Control {...props}>
      <span style={style}>{emoji}</span>
      {children}
    </components.Control>
  )
}

const SelectField: React.FC<Props> = ({
  options,
  disabled = false,
  className,
  icon,
  control,
  name,
  valueKey,
  labelKey,
  placeholder,
  errors,
  isMulti = false,
  handleChange,
  setValueLabel,
  hideBorder,
  isSearchable = true
}) => {
  const { DropdownIndicator, ClearIndicator } = components

  const customDropdownIndicator = (
    props: JSX.IntrinsicAttributes & DropdownIndicatorProps<any, boolean, GroupBase<unknown>>
  ) => {
    if (!props.selectProps.value || props.selectProps.value?.length === 0) {
      return <DropdownIndicator {...props} />
    }

    return null
  }

  const customClearIndicator = (
    props: JSX.IntrinsicAttributes & ClearIndicatorProps<unknown, boolean, GroupBase<unknown>>
  ) => {
    if (props.selectProps.value) {
      return <ClearIndicator {...props} />
    }

    return null
  }
  const { t } = useTranslation()

  const customStyles = {
    indicatorSeparator: () => ({
      display: 'none'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      height: 56,
      position: 'relative',
      borderRadius: '12px',
      border: 'none',
      boxShadow: state.isFocused ? '1px solid #272A37' : '1px solid #E9EAEB',
      transition: 'border 0.2s',
      cursor: 'pointer',
      backgroundColor: state.isDisabled ? '#F4F4F5' : '#F6F7F9',
      color: '#171717',
      fontWeight: '600'
    }),
    valueContainer: (provided: any) => ({
      ...provided
    }),

    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '180px',
      backgroundColor: '#F6F7F9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: 'none'
    }),
    placeholder: (defaultStyles: any, state: any) => {
      return {
        ...defaultStyles,
        fontSize: '14px',
        color: state.isDisabled ? '#BEBFC3' : '#A9AAAF',
        fontWeight: '600'
      }
    },
    singleValue: (provided: any) => ({
      ...provided,
      fontWeight: '700'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#FE5F0A26' : state.isFocused ? '#FE5F0A26' : '#F6F7F9',
      color: state.isSelected ? '#FE5F0A' : '#000',
      fontWeight: state.isSelected ? '600' : '400'
    })
  }

  return (
    <div className={`relative ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              styles={customStyles}
              options={options}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: '#FE5F0A26',
                  primary25: '#FE5F0A26'
                }
              })}
              value={
                isMulti
                  ? options?.filter(opt => (valueKey ? value?.includes(opt[valueKey]) : value.includes(opt.value)))
                  : options?.filter(opt => (valueKey ? opt[valueKey] === value : opt.value === value))
              }
              onChange={(e: any) => {
                const selectedValues = isMulti
                  ? e.map((opt: any) => (valueKey ? opt[valueKey] : opt.value))
                  : valueKey
                  ? e?.[valueKey] || ''
                  : e?.value || []

                onChange(selectedValues)
                handleChange && handleChange()
                setValueLabel &&
                  setValueLabel(
                    isMulti
                      ? options?.filter(opt => (valueKey ? value?.includes(opt[valueKey]) : value.includes(opt.value)))
                      : options?.filter(opt => (valueKey ? opt[valueKey] === value : opt.value === value))
                  )
                setValueLabel &&
                  setValueLabel(isMulti ? e.map((opt: any) => (labelKey ? opt[labelKey] : opt.value)) : e?.label || '')
              }}
              className={`${
                _.get(errors, name)?.message && !hideBorder ? `error-border border border-red-100 rounded-[12px]` : ''
              }`}
              isMulti={isMulti}
              getOptionLabel={(option: any) => labelKey && option[labelKey]}
              getOptionValue={(option: any) => valueKey && option[valueKey]}
              components={{
                DropdownIndicator: customDropdownIndicator,
                ClearIndicator: customClearIndicator,
                Control
              }}
              isSearchable={isSearchable}
              isClearable
              placeholder={placeholder}
              isDisabled={disabled}
              
              // @ts-ignore
              emoji={
                icon && (
                  <div className={`${hideBorder ? 'hidden md:flex' : 'ml-2'}`}>
                    <Icon svgPath='clock' width={18} height={18} className='fill-black' />
                  </div>
                )
              }
            />
            {_.get(errors, name)?.message && (
              <ul className='list-disc ml-6 text-sm text-red-100 py-2 max-h-max relative'>
                <li>{t(_.get(errors, name)?.message)}</li>
              </ul>
            )}
          </>
        )}
      />
    </div>
  )
}

export default SelectField
