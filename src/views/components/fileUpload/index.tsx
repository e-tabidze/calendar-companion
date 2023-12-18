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

  console.log(value, 'value')

  return (
    <div className='flex items-center gap-8'>
      <div className='w-24 h-20 flex items-center justify-center overflow-hidden rounded-2xl bg-green-10 border-dashed border-raisin-10'>
        {value ? (
          <div className='relative w-full h-full border-dashed border-raisin-10 overflow-hidden bg-green-10 rounded-2xl'>
            {value ? <Image src={value} alt='' /> : <Icon svgPath='play' width={20} height={20} />}
            <IconButton icon='close' className='absolute top-2 right-2' onClick={handleDelete} height={30} width={30} />
          </div>
        ) : (
          <label className='w-full h-full flex items-center justify-center cursor-pointer'>
            <Icon svgPath='fileUpload' width={27} height={26} />
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
