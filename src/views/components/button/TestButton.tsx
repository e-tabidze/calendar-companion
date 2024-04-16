import React from 'react'

type IProps = {
  label: string
  disabled?: boolean
  onClick: () => void
}

const TestButton = ({ label, disabled, onClick }: IProps) => {
  return (
    <button disabled={disabled} onClick={() => onClick()}>
      {label}
    </button>
  )
}

export default TestButton
