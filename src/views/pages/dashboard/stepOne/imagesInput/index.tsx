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
}

const FileUpload: React.FC<Props> = ({ title, description, onChange, handleDelete, value }) => {
  // const supportedFileTypes = ['pdf', 'jpg', 'jpeg', 'png', 'gif']

  console.log(value, 'value images')

  return (
    <div className='flex items-center gap-8'>
      {value?.length > 0 && (
        <div className='flex gap-4'>
          {value?.map((image: string) => (
            <Image src={image} alt='' className='w-24 h-24 rounded-2xl' />
          ))}
        </div>
      )}
      <div className='flex h-24 px-6 justify-center items-center gap-4 rounded-2xl bg-green-10 border-dashed border-raisin-10'>
        <label className=' flex items-center justify-center cursor-pointer'>
          <Icon svgPath='fileUpload' width={27} height={26} />
          <input type='file' className='sr-only' onChange={onChange} multiple />
        </label>
        <div>
          <Typography type='subtitle'>{title}</Typography>
          <Typography type='body' color='light'>
            {description}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
