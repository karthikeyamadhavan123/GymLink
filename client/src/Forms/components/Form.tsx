import { FormSubmitProps } from '@/types'
import React from 'react'
const Form: React.FC<FormSubmitProps> = ({ handleSubmit, bodyContent,children}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
      {children}
      {bodyContent}
    </form>
    </>
  )
}

export default Form
