import React, { useState } from 'react'
import Typography from '../typography'

const Counter = () => {
  const [count, setCount] = useState(0)

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const incrementCount = () => {
    setCount(count + 1)
  }

  return (
    <div className='flex items-center w-32 justify-between'>
      <button
        className={`rounded-full px-4 py-2 ${count === 0 ? 'cursor-not-allowed bg-grey-110 opacity-25' : 'bg-white shadow-sm'}`}
        onClick={decrementCount}
        disabled={count === 0}
      >
        -
      </button>
      <Typography type="h5" className='w-9 text-center'>
        {count}
      </Typography>
      <button className='rounded-full bg-white px-4 py-2 shadow-sm' onClick={incrementCount}>
        +
      </button>
    </div>
  )
}

export default Counter
