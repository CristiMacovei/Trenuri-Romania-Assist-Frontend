import React from 'react'

export default function Title(props) {
  return (
    <div>
      <span className='text-xl'> {typeof props.content === 'string' ? props.content : 'Use the content prop to change the text here'} </span>
    </div>
  )
}
