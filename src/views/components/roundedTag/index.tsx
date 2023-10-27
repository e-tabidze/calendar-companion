import React from 'react';
import Typography from '../typography';

interface Props {
  handleSelect?: any;
  selected: boolean;
  label: string;
}

const RoundedTag: React.FC<Props> = ({ handleSelect, selected, label }) => {
  return (
    <div
      className={`${selected ? 'bg-green-100' : 'bg-grey-110'} rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center`}
      onClick={handleSelect}
    >
      <Typography type='body' className='text-white'>
        {label}
      </Typography>
    </div>
  );
};

export default RoundedTag;
