import Image from 'next/image'
import React from 'react'

export const DefaultButton = ({ text, onClick, bg, className, textColor, type }: any) => {
  return (
    <button
      className={`${bg} rounded-xl  ${bg ? `${textColor}` : 'text-raisin-130'} text-2sm w-max ${
        bg ? 'border-none' : 'border border-px-raisin-130'
      } py-3 px-6 font-normal' ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}

export const OutlinedButton = ({ label, onClick, type = 'button' }: any) => {
  return (
    <button className='border border-raisin-130 rounded-2xl px-3 py-2 h-max text-sm' onClick={onClick} type={type}>
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
      className={`flex group items-center cursor-pointer ${
        hasBg ? 'p-4 xl:p-5' : ''
      } rounded-2xl  w-fit h-12 max-w-[30%] ${hasBg ? `bg-${bg}` : ''} ${className}`}
    >
      <Image src={icon} height={height} width={width} alt='' className={`group-disabled:opacity-30 !max-w-none `} />
    </button>
  )
}

export const IconTextButton = ({ label, icon, bg, className, onClick, labelClassname, type = 'button' }: any) => {
  return (
    <button
      className={`flex items-center focus:outline-none rounded-2xl ml-6 md:ml-8 ${bg} ${bg ? 'p-4' : ''} ${className}`}
      onClick={onClick}
      type={type}
    >
      <img src={icon} className='max-w-none' alt='img' />{' '}
      <span className={`${labelClassname} text-2sm ml-3`}>{label}</span>
    </button>
  )
}
