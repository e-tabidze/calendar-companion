import Image from 'next/image'
import React from 'react'

export const DefaultButton = ({ text, onClick, bg, className, textColor, type, disabled }: any) => {
  return (
    <button
      className={`${bg} rounded-xl ${disabled ? 'opacity-60' : ''}  ${bg ? `${textColor}` : 'text-raisin-100'} text-2sm ${
        bg ? 'border-none' : 'border border-px-raisin-100'
      } inline-flex items-center justify-center h-10 min-w-10 px-3 font-normal ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export const OutlinedButton = ({ label, onClick, type = 'button' }: any) => {
  return (
    <button className='border border-raisin-100 h-10 min-w-10 inline-flex items-center justify-center rounded-xl' onClick={onClick} type={type}>
      {label}
    </button>
  )
}

export const IconButton = ({
  icon,
  innerRef,
  hasBg,
  bg,
  className,
  onClick,
  height,
  width,
  type = 'button',
  ...props
}: any) => {
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      ref={innerRef}
      className={`flex shrink-0 group items-center cursor-pointer ${
        hasBg ? 'p-4 xl:p-5' : ''
      } rounded-2xl w-8 h-8 ${hasBg ? `bg-${bg}` : ''} ${className}`}
    >
      <Image src={icon} height={height} width={width} alt='' className={`group-disabled:opacity-30 !max-w-none `} />
    </button>
  )
}

export const IconTextButton = ({ label, icon, bg, className, onClick, labelClassname, type }: any) => {
  return (
    <button
      className={`flex items-center focus:outline-none rounded-2xl ${bg} ${bg ? 'p-4' : ''} ${className}`}
      onClick={onClick}
      type={type}
    >
      <img src={icon} className='max-w-none' alt='img' />
      <span className={`${labelClassname} text-2sm ml-4`}>{label}</span>
    </button>
  )
}
