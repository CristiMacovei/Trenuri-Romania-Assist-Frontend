import React from 'react'

export default function Container(props) {
  return (
    <div className='pt-8 flex flex-col items-center justify-center'>
      {props.children}
    </div>
  )
}
