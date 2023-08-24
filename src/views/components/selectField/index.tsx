import React from 'react'
import Image from 'next/image'
import { Controller } from 'react-hook-form'
import Select, { ClearIndicatorProps, components, DropdownIndicatorProps, GroupBase } from 'react-select'

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
    transition: 'border 0.2s'
  }),
  valueContainer: (provided: any, state: { hasValue: any }) => ({
    ...provided,
    marginTop: state.hasValue ? '10px' : '0px'
  }),
  menu: (provided: any) => ({
    ...provided,
    maxHeight: '150px',
    overflow: 'auto'
  })
}
interface Option {
  value: string
  label: string
}

interface Props {
  placeholder?: string
  options: Option[]
  disabled?: boolean
  className?: string
  icon?: boolean
  value?: any
  control: any
  name: string
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

const SelectField: React.FC<Props> = ({ placeholder, options, disabled = false, className, icon, control, name }) => {
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
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <Select
            styles={customStyles}
            options={options}
            value={options.find(opt => opt.value === value)}
            onChange={(e: any) => {
              onChange(e.value)
            }}
            components={{
              DropdownIndicator: customDropdownIndicator,
              ClearIndicator: customClearIndicator,
              Control
            }}
            isClearable
            placeholder={''}
            isDisabled={disabled}
            // @ts-ignore
            emoji={
              icon && (
                <div className='ml-4'>
                  <Image src='/icons/clock.svg' alt='' height={18} width={18} />
                </div>
              )
            }
          />
        )}
      />
    </div>
  )
}

export default SelectField
