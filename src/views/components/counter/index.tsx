import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Typography from '../typography';

interface Props {
  name: string;
  control: any;
  defaultValue?: number;
}

const Counter: React.FC<Props> = ({ name, control, defaultValue }) => {
  const [count, setCount] = useState(defaultValue || 0);

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  const incrementCount = () => {
    setCount(count + 1);
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <div className='flex items-center w-32 justify-between'>
          <button
            className={`rounded-full px-4 py-2 ${
              count === 0 ? 'cursor-not-allowed bg-grey-110 opacity-25' : 'bg-white shadow-sm'
            }`}
            onClick={() => {
              decrementCount();
              onChange(count - 1);
            }}
            type='button'
            disabled={count === 0}
          >
            -
          </button>
          <Typography type='h5' className='w-9 text-center'>
            {count}
          </Typography>
          <button
            className='rounded-full bg-white px-4 py-2 shadow-sm'
            type='button'
            onClick={() => {
              incrementCount();
              onChange(count + 1);
            }}
          >
            +
          </button>
        </div>
      )}
    />
  );
}

export default Counter;
