import React from 'react';
import Typography from '../typography';
import {useTranslation} from "next-i18next";

interface Props {
  handleSelect?: any;
  selected: boolean;
  label: string;
}

const RoundedTag: React.FC<Props> = ({ handleSelect, selected, label }) => {
  const {t} = useTranslation()

  return (
    <div
      className={`${selected ? 'bg-green-100' : 'bg-grey-110'} shrink-0 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center cursor-pointer`}
      onClick={handleSelect}
    >
      <Typography type='body' className='text-white'>
        {t(label)}
      </Typography>
    </div>
  );
};

export default RoundedTag;
