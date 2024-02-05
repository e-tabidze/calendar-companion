import React from 'react'
import { Controller } from 'react-hook-form'
import Typography from '../typography'

interface Props {
  name: string
  control: any
  disabled?: boolean
  max?: number
}

const Counter: React.FC<Props> = ({ name, control, disabled, max }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className={`flex items-center justify-between ${disabled ? 'cursor-default pointer-events-none' : ''}`}>
          <button
            className={`rounded-full flex w-8 h-8 items-center justify-center ${
              value === 0 ? 'cursor-not-allowed bg-grey-110 opacity-25' : 'bg-white shadow-sm'
            }`}
            onClick={() => onChange(Number(value) - 1)}
            type='button'
            disabled={value === 0}
          >
            -
          </button>
          <Typography type='h5' className='mx-3 text-center'>
            {value}
          </Typography>
          <button
            className={`rounded-full flex w-8 h-8 items-center justify-center bg-white shadow-sm ${
              max !== undefined && value === max ? 'cursor-not-allowed' : ''
            }`}
            type='button'
            onClick={() => onChange(Number(value) + 1)}
            disabled={max !== undefined && value === max}
          >
            +
          </button>
        </div>
      )}
    />
  )
}

export default Counter
