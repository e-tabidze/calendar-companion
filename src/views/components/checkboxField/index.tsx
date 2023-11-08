import React from 'react'
import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'

interface Props {
  iconPath?: string
  name: string
  control: any
  append?: () => void
  title: string
}

const CheckboxField: React.FC<Props> = ({ iconPath, name, control, append, title }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className=''>
          <> {console.log(value, 'value')} </>
          <label className='flex gap-7 items-center'>
            <input
              type='checkbox'
              className='accent-green-100 relative w-5 h-5 rounded-lg'
              value={value}
              onChange={append ? append : () => onChange(value)}
            />
            {iconPath ? <Icon svgPath={iconPath} className='w-12' width={20} height={20} /> : null}
            <Typography type='button' color='dark' weight='normal'>
              {title}
            </Typography>
          </label>
        </div>
      )}
    />
  )
}

export default CheckboxField
