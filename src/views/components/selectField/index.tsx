import React from 'react'
import { Controller } from 'react-hook-form'
import Select, { ClearIndicatorProps, components, DropdownIndicatorProps, GroupBase } from 'react-select'
import _ from 'lodash'
import Icon from 'src/views/app/Icon'

const customStyles = {
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    height: 56,
    position: 'relative',
    '&:hover': { border: '1px solid #BEBFC3' },
    borderRadius: '8px',
    border: state.isFocused ? '1px solid #272A37' : '1px solid #E9EAEB',
    boxShadow: state.isFocused ? '1px solid #272A37' : '1px solid #E9EAEB',
    transition: 'border 0.2s',
    cursor: 'pointer',
  }),
  valueContainer: (provided: any) => ({
    ...provided
  }),

  menuList: (provided: any) => ({
    ...provided,
    height: '150px'
  }),

  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      fontSize: '14px',
      color: '#93959B'
    }
  }
}

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
  isMulti,
  handleChange
}) => {
  const { DropdownIndicator, ClearIndicator } = components

  const customDropdownIndicator = (
    props: JSX.IntrinsicAttributes & DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
  ) => {
    if (!props.selectProps.value) {
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
              value={
                isMulti
                  ? options?.filter(opt => (valueKey ? value?.includes(opt[valueKey]) : value.includes(opt.value)))
                  : options?.find(opt => (valueKey ? opt[valueKey] === value : opt.value === value))
              }
              onChange={(e: any) => {
                const selectedValues = isMulti
                  ? e.map((opt: any) => (valueKey ? opt[valueKey] : opt.value))
                  : valueKey
                  ? e?.[valueKey] || []
                  : e?.value || []

                onChange(selectedValues)
                handleChange && handleChange()
              }}
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
                  <div className='ml-4'>
                    <Icon svgPath='clock' width={18} height={18} />
                  </div>
                )
              }
            />
            {_.get(errors, name)?.message && (
              <div id={name} className='text-sm text-red-100 ml-2 py-2 relative max-h-max'>
                {_.get(errors, name)?.message}
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default SelectField
