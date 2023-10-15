import React from 'react'
import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import { OptionSelectContainer } from './styles'

interface Option {
  value: string
  label?: string | JSX.Element
  icon?: string
  width?: string
  height?: string
}

interface Props {
  options: Option[]
  name: string
  control: any
}

const TwoOptionSelector: React.FC<Props> = ({ options, name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options[0].value}
      render={({ field: { onChange, value } }) => (
        <OptionSelectContainer>
          {options.map((option, index) => (
            <button
              key={index}
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                value === option.value ? 'bg-raisin-10' : ''
              }`}
              onClick={() => onChange(option.value)}
              type='button'
            >
              {option.icon ? (
                <Icon
                  svgPath={option.icon}
                  width={option.width}
                  height={option.height}
                  color={value === option.value ? '#272A37' : '#8C929B'}
                  className='icon-class'
                />
              ) : (
                <Typography type='body'>{option.label}</Typography>
              )}
            </button>
          ))}
        </OptionSelectContainer>
      )}
    />
  )
}

export default TwoOptionSelector
