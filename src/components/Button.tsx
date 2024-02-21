import React from 'react'

interface ButtonProps {
  children: string
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {


  return (
    <div>
      <button className='text-md font-mono font-600 px-4 py-1 rounded-md bg-sky-600'>{props.children}</button>    
    </div>
  )
}

export default Button
