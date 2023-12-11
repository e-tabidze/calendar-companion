import React, { useState } from 'react'
import Image from 'src/views/components/image'
import { FileInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import { ImageInputInfo, ImageInputLabel } from './styles'
import Icon from "src/views/app/Icon";

interface Props {
  label?: string
  infoText?: string
  subtitle?: string
  icon?: boolean
  bg?: string
}

type ImageData = {
  id: number
  url: string
}

const ImagesInput: React.FC<Props> = ({ label, infoText, subtitle, icon, bg }) => {
  const [files, setFiles] = useState<ImageData[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type. Please upload a JPG, PNG, or SVG image.')

      return false
    }

    if (file.size > maxSize) {
      console.error('File size exceeds the limit. Please upload an image up to 10MB.')

      return false
    }

    return true
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const uploadedImages: ImageData[] = Array.from(files).reduce<ImageData[]>((acc, file, index) => {
        if (validateFile(file)) {
          return [...acc, { id: index + 1, url: URL.createObjectURL(file) }]
        }

        return acc
      }, [])
      setFiles(prevImages => [...prevImages, ...uploadedImages])
    }
  }

  const handleDelete = (index: number) => {
    setFiles(prevImages => {
      const newImages = [...prevImages]
      newImages.splice(index, 1)

      return newImages
    })
  }

  const handleMakeFirst = (index: number) => {
    setFiles(prevImages => {
      const newImages = [...prevImages]
      const [image] = newImages.splice(index, 1)
      newImages.unshift(image)

      return newImages
    })
  }

  return (
    <div className='flex flex-wrap-reverse max-w-full'>
      <div className={`flex flex-wrap gap-4 ${files.length > 0 ? 'mr-4' : ''}`}>
        {files.map((image, index) => (
          <div
            key={index}
            className='relative rounded-xl'
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image src={image.url} className='w-20 h-[70px] object-cover rounded-xl' alt={`Image ${image.id}`} />
            {hoveredIndex === index && (
              <div className='absolute top-0 right-0 flex justify-between w-full p-2'>
                <Icon svgPath={index === 0 ? 'photoGreen' : 'photo'}
                      onClick={() => handleMakeFirst(index)}
                      width={20}
                      height={20}
                      className='w-fit h-fit' />
                <Icon svgPath='trash' width={20} height={21} onClick={() => handleDelete(index)} className='w-fit h-fit'/>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='w-fit min-w-max'>
        <div
          className={`h-[70px] ${
            icon ? 'w-full max-w-[360px]' : 'w-[70px]'
          } relative flex flex-col items-center justify-center p-4 ${
            bg ? bg : 'bg-white'
          } border-1 border-dashed border-raisin-10 rounded-lg`}
        >
          <ImageInputLabel htmlFor='fileInput'>
            {icon && <Icon svgPath='upload' width={29} height={28} className='fill-transparent' /> }
            <ImageInputInfo>
              <Typography type='subtitle'>{label}</Typography>
              <Typography type='body' color='light'>
                {infoText}
              </Typography>
            </ImageInputInfo>
          </ImageInputLabel>
          <FileInput id='fileInput' type='file' accept='image/*' multiple onChange={handleImageUpload} />
        </div>
        <Typography type='body' color='light' className='text-center mt-2'>
          {subtitle}
        </Typography>
      </div>
    </div>
  )
}

export default ImagesInput
