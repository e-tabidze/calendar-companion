import Image from 'next/image'
import React, { useState } from 'react'
import Select, { ClearIndicatorProps, components, DropdownIndicatorProps, GroupBase } from 'react-select'
import Typography from '../typography'

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
  disabled: boolean
  className?: string
  icon?: boolean
  onChange: (e: any) => void
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

const SelectField: React.FC<Props> = ({ placeholder, options, disabled, className, icon, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option>()

  const handleChange = (option: any) => {
    setSelectedOption(option)
  }

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
      <Typography
        type='body'
        color='light'
        className={`${selectedOption && selectedOption.value ? 'inline-block absolute z-30 left-3 top-1' : 'hidden'}`}
      >
        {placeholder}
      </Typography>
      <Select
        styles={customStyles}
        options={options}
        value={selectedOption}
        onChange={onChange}
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
              <Image src='/icons/clock.svg' alt='' height={18} width={18} />
            </div>
          )
        }
      />
    </div>
  )
}

export default SelectField
