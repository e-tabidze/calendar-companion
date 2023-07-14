import React from 'react'
import Image from '../image'
import Typography from '../typography'

interface Props {
  label: string
  iconPath?: string
  value: string
}

const Checkbox = ({ label, iconPath, value }: Props) => {
  return (
    <div className=''>
      <label className='flex gap-7 items-center'>
        <input type='checkbox' className='accent-green-100 relative w-4 h-4 rounded-lg' value={value} />
        <div className='absolute'> </div>
        {iconPath ? <Image src={iconPath} className='w-12' alt='' /> : null}
        <Typography type='button' color='dark' weight='normal'>
          {label}
        </Typography>
      </label>
    </div>
  )
}

export default Checkbox
