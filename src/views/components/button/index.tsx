import React from 'react'
import Icon from 'src/views/app/Icon'

export const DefaultButton = ({ text, onClick, bg, className, textColor, type, disabled }: any) => {
  return (
    <button
      className={`${bg} rounded-xl ${disabled ? 'opacity-60' : ''}  ${
        bg ? `${textColor}` : 'text-raisin-100'
      } text-2sm ${
        bg ? 'border-none text-white' : 'border border-px-raisin-100'
      } inline-flex items-center justify-center h-12 min-w-10 px-6 font-normal ${className}`}
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
    <button
      className='border border-raisin-100 h-10 min-w-10 inline-flex items-center justify-center rounded-xl'
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  )
}

export const IconButton = ({
  icon,
  innerRef,
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
      className={`flex shrink-0 group items-center cursor-pointer ${bg ? 'p-4 xl:p-5' : ''} rounded-2xl ${
        bg ? `bg-${bg}` : ''
      } ${className}`}
    >
      <Icon
        svgPath={icon}
        height={height}
        width={width}
        className={`fill-transparent group-disabled:opacity-30 !max-w-none `}
      />
    </button>
  )
}

export const IconTextButton = ({ label, icon, width, height, bg, className, onClick, labelClassname, type, disabled }: any) => {
  return (
    <button
      className={`flex items-center focus:outline-none rounded-2xl  ${bg} ${bg ? 'p-4' : ''} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <Icon svgPath={icon} width={width} height={height} className='fill-transparent' />
      <span className={`text-2sm ml-3 ${labelClassname} `}>{label}</span>
    </button>
  )
}
