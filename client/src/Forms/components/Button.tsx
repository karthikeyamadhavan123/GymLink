import { ButtonProps } from '@/types'
import React from 'react'
import clsx from 'clsx'

const Button: React.FC<ButtonProps> = ({ type = 'button', handleClick, text, className, disabled }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        className
      )}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
