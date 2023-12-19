import React from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  className?: string
}

const Image: React.FC<ImageProps> = ({ src, className, ...props }) => {
  return <img src={src} className={`${className}`} alt='image' {...props} />
}

export default Image
