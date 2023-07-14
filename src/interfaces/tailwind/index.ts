import React from 'react'

export interface TailwindComponent extends React.HTMLAttributes<HTMLDivElement> {
    children: any
    className?: string
    id?: any
    onClick?: any
  }

export type TailwindDiv = React.HTMLAttributes<HTMLDivElement>

export type TailwindButton = React.HTMLAttributes<HTMLButtonElement>

export type TailwindInput = React.HTMLAttributes<HTMLInputElement>

export type TailwindSpan = React.HTMLAttributes<HTMLSpanElement>