import React, { useState, ChangeEvent } from 'react'
import { IconButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

interface Props {
  title: string
  description: string
}

const FileUpload: React.FC<Props> = ({ title, description }) => {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>('')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = e => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setFile(null)
      setFileContent('')
    }
  }

  const supportedFileTypes = ['pdf', 'jpg', 'jpeg', 'png', 'gif']
  const showPreview = file && supportedFileTypes.some(ext => file.name.toLowerCase().endsWith(ext))

  const handleDelete = () => {
    setFile(null)
    setFileContent('')
  }

  return (
    <div className='flex items-center gap-8'>
      <div className='w-24 h-20 flex items-center justify-center overflow-hidden rounded-2xl bg-green-10 border-dashed border-raisin-10'>
        {showPreview ? (
          <div className='relative w-full h-full border-dashed border-raisin-10 overflow-hidden bg-green-10 rounded-2xl'>
            {file.type === 'application/pdf' ? (
              <iframe title='File Preview' src={fileContent} width='100%' height='100%' />
            ) : (
              <img src={fileContent} alt='File Preview' className='max-w-full max-h-full' />
            )}
            <IconButton icon='/icons/close.svg' className='absolute top-2 right-2' onClick={handleDelete} height={30} width={30} />
          </div>
        ) : (
          <>
            {file ? (
              <div className='w-full h-full flex items-center justify-center'>
                <p>{file.name}</p>
              </div>
            ) : (
              <label className='w-full h-full flex items-center justify-center cursor-pointer'>
                <Image src='/icons/upload.svg' alt='' />
                <input type='file' className='sr-only' onChange={handleFileChange} />
              </label>
            )}
          </>
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
