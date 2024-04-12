import React from 'react'
import { Controller } from 'react-hook-form'
import Select, { ClearIndicatorProps, components, DropdownIndicatorProps, GroupBase } from 'react-select'
import _ from 'lodash'
import Icon from 'src/views/app/Icon'
import {useTranslation} from "next-i18next";



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
  errorAbsolute,
  errorRight,
  isMulti = false,
  handleChange,
  setValueLabel,
  hideBorder
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
  const {t} = useTranslation()

  const customStyles = {
    indicatorSeparator: () => ({
      display: 'none'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      height: 56,
      position: 'relative',
      '&:hover': { border: hideBorder ? '' : '1px solid #BEBFC3'},
      borderRadius: '12px',
      border: hideBorder ? 'none' : state.isDisabled ? '1px solid #F4F4F5' : state.isFocused ? '1px solid #272A37':'1px solid #E9EAEB',
      boxShadow: state.isFocused ? '1px solid #272A37' : '1px solid #E9EAEB',
      transition: 'border 0.2s',
      cursor: 'pointer',
      backgroundColor: state.isDisabled ? '#F4F4F5': '#ffffff'
    }),
    valueContainer: (provided: any) => ({
      ...provided
    }),
  
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '180px'
    }),
  
    placeholder: (defaultStyles: any, state:any) => {
      return {
        ...defaultStyles,
        fontSize: '14px',
        color: state.isDisabled? '#BEBFC3':'#93959B'
      }
    }
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
                  primary: '#549684',
                  primary25: '#DDEAE6'
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
                  ? e?.[valueKey] || []
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
              className={`${_.get(errors, name)?.message && !hideBorder ? `error-border border border-red-100 rounded-[12px]` : ''}`}
              isMulti={isMulti}
              getOptionLabel={option => labelKey && option[labelKey]}
              getOptionValue={option => valueKey && option[valueKey]}
              components={{
                DropdownIndicator: customDropdownIndicator,
                ClearIndicator: customClearIndicator,
                Control
              }}
              isClearable
              placeholder={placeholder}
              isDisabled={disabled}
              
              // @ts-ignore
              emoji={
                icon && (
                  <div className={`${hideBorder ? 'hidden md:flex': 'ml-2'}`}>
                    <Icon svgPath='clock' width={18} height={18} className='fill-black' />
                  </div>
                )
              }
            />
            {_.get(errors, name)?.message && (
              <div
                id={name}
                className={`${errorAbsolute ? 'absolute top-full' : 'relative py-2'} ${
                  errorRight ? 'right-0' : ''
                } text-sm text-red-100 max-h-max`}
              >
                {t(_.get(errors, name)?.message)}
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default SelectField
