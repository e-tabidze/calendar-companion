import React, { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  title: string
  description: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: (index: number) => void
  value: any
  handleMoveToFront: (index: any) => void
  isLoading: boolean
}

const ImagesInput: React.FC<Props> = ({
  title,
  description,
  onChange,
  handleRemoveImage,
  value,
  handleMoveToFront,
  isLoading
}) => {
  return (
    <div className='flex items-center gap-8 flex-wrap'>
      {isLoading ? <div className='w-100 h-100 flex items-center justify-center rounded-12'>
            <div className='flex items-center cursor-pointer'>
              <Icon svgPath='loader' width={30} height={30} />
              <span className='text-gray-800 text-3 font-medium mt-3'></span>
            </div>
          </div> :  value?.length > 0 && (
        <div className='flex gap-4 flex-wrap'>
          {value?.map((image: string, index: number) => (
            <div className='relative' key={index}>
              <Image src={image} alt='' className='w-24 h-24 rounded-2xl' />
              <Icon
                svgPath='remove'
                width={27}
                height={26}
                onClick={() => handleRemoveImage(index)}
                className='absolute top-2 right-0 cursor-pointer'
              />
              <Icon
                svgPath='imagePlaceholder'
                width={27}
                height={26}
                onClick={() => handleMoveToFront(index)}
                className='absolute top-2 left-2 cursor-pointer'
              />
            </div>
          ))}
        </div>
      )}
      <label className=' flex items-center justify-center cursor-pointer'>
        <div className='flex min-w-[284px] h-24 px-6 justify-center items-center gap-4 rounded-2xl bg-green-10 border-dashed border-raisin-10'>
          <Icon className='fill-transparent' svgPath='fileUpload' width={27} height={26} />

          <input type='file' className='sr-only' onChange={onChange} multiple />

          <div>
            <Typography type='subtitle'>{title}</Typography>
            <Typography type='body' color='light'>
              {description}
            </Typography>
          </div>
        </div>
      </label>
    </div>
  )
}

export default ImagesInput
