import React, { ChangeEvent } from 'react'
import Icon from 'src/views/app/Icon'
import { IconButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

interface Props {
  title: string
  description: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDelete: () => void
  value: any
  isLoading?: boolean
}

const FileUpload: React.FC<Props> = ({ title, description, onChange, handleDelete, value, isLoading }) => {

  return (
    <div className='flex items-center gap-8'>
      <div className='w-[76px] h-[76px] md:w-24 md:h-24 border-2 border-dashed border-green-100 rounded-3xl relative flex shrink-0 items-center justify-center overflow-hidden bg-green-10 transition-all hover:border-2'>
        {isLoading ? (
          <div className='w-100 h-100 flex items-center justify-center rounded-12'>
            <div className='flex items-center cursor-pointer'>
              <Icon svgPath='loader' width={30} height={30} />
              <span className='text-gray-800 text-3 font-medium mt-3'></span>
            </div>
          </div>
        ) : value ? (
          <div className='relative w-full h-full border-ded border-raisin-10 overflow-hidden bg-green-10 rounded-2xl transition-all hover:border-green-100'>
            {value ? <Image src={value} alt='' className='w-full h-full object-cover' /> : <Icon svgPath='play' width={20} height={20} />}
            <IconButton
              icon='closeSm'
              className='cursor-pointer absolute top-2 right-2'
              onClick={handleDelete}
              height={20}
              width={20}
            />
          </div>
        ) : (
          <label className='w-full h-full flex items-center justify-center cursor-pointer'>
            <Icon svgPath='fileUpload' width={27} height={26} className='fill-transparent' />
            <input type='file' className='sr-only' onChange={onChange} value={value} />
          </label>
        )}
      </div>

      <div>
        <Typography type='subtitle'>{title}</Typography>
        <Typography type='body' color='light'>
          {description}
        </Typography>
      </div>
    </div>
  )
}

export default FileUpload
