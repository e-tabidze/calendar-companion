import Image from 'next/image'
import React from 'react'

export const DefaultButton = ({ text, onClick, bg, className, textColor }: any) => {
  return (
    <button
      className={`${bg} 'rounded-xl rounded-xl ${bg ? `${textColor}` : 'text-raisin-130'} text-2sm w-max ${
        bg ? 'border-none' : 'border border-px-raisin-130'
      } py-3 px-6 font-normal' ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export const OutlinedButton = ({ label, onClick }: any) => {
  return (
    <button className='border border-raisin-130 rounded-2xl px-3 py-2 h-max text-sm' onClick={onClick}>
      {label}
    </button>
  )
}

export const IconButton = ({
  icon,
  innerRef,
  hasBg,
  text,
  bg,
  responsive,
  className,
  onClick,
  height,
  width,
  ...props
}: any) => {
  return (
    <div
      {...props}
      onClick={onClick}
      ref={innerRef}
      className={`flex group items-center cursor-pointer ${hasBg ? 'p-4 xl:p-5' : ''} rounded-2xl ${
        text && 'gap-2'
      } w-fit h-12 max-w-[30%] ${hasBg ? `bg-${bg}` : ''} ${className}`}
    >
      <Image src={icon} height={height} width={width} alt='' className={`group-disabled:opacity-30 !max-w-none `} />
      <div className={`${responsive && 'md:hidden'} text-sm ${hasBg ? 'text-white' : 'text-base-100'}`}>{text}</div>
    </div>
  )
}

export const IconTextButton = ({ label, icon, bg, className, onClick, labelClassname }: any) => {
  return (
    <button
      className={`flex gap-2 focus:outline-none rounded-2xl ${bg} ${bg ? 'p-4' : ''} ${className}`}
      onClick={onClick}
      type='button'
    >
      <img src={icon} className='max-w-none' alt='img' /> <span className={`${labelClassname} text-2sm`}>{label}</span>
    </button>
  )
}
