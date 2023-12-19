import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import Typography from '../typography'

interface Props {
  name: string
  control: any
  defaultValue?: number
  disabled?: boolean
  max?: number
}

const Counter: React.FC<Props> = ({ name, control, defaultValue, disabled, max }) => {
  const [count, setCount] = useState(defaultValue || 0)

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const incrementCount = () => {
    setCount(count + 1)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange } }) => (
        <div
          className={`flex items-center justify-between ${
            disabled ? 'cursor-default pointer-events-none' : ''
          }`}
        >
          <button
            className={`rounded-full flex w-8 h-8 items-center justify-center ${
              count === 0 ? 'cursor-not-allowed bg-grey-110 opacity-25' : 'bg-white shadow-sm'
            }`}
            onClick={() => {
              decrementCount()
              onChange(count - 1)
            }}
            type='button'
            disabled={count === 0}
          >
            -
          </button>
          <Typography type='h5' className='mx-3 text-center'>
            {count}
          </Typography>
          <button
            className={`rounded-full flex w-8 h-8 items-center justify-center bg-white shadow-sm ${
              max !== undefined && count === max ? 'cursor-not-allowed' : ''
            }`}
            type='button'
            onClick={() => {
              incrementCount()
              onChange(count + 1)
            }}
            disabled={max !== undefined && count === max}
          >
            +
          </button>
        </div>
      )}
    />
  )
}

export default Counter
