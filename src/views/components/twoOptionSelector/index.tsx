import React, { useState } from 'react'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import { OptionSelectContainer } from './styles'

interface Option {
  value: string
  label?: string | JSX.Element
  icon?: string
}

interface Props {
  options: Option[]
}

const TwoOptionSelector: React.FC<Props> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(options[0])

  const handleOptionClick = (option: Option) => setSelectedOption(option)

  return (
    <OptionSelectContainer>
      {options.map((option, index) => (
        <button
          key={index}
          className={`rounded-full w-8 h-8 flex items-center justify-center ${
            selectedOption?.value === option.value ? 'bg-raisin-10' : ''
          }`}
          onClick={() => handleOptionClick(option)}
          type='button'
        >
          {option.icon ? (
            <Icon
              svgPath={option.icon}
              width='20'
              height='20'
              color={selectedOption?.value === option.value ? '#272A37' : '#8C929B'}
              className='icon-class'
            />
          ) : (
            <Typography type='body'>{option.label}</Typography>
          )}
        </button>
      ))}
    </OptionSelectContainer>
  )
}

export default TwoOptionSelector
