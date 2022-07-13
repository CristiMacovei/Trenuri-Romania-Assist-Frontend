import React from 'react'

export default function Form(props) {
  function handleSubmit(evt) {
    evt.preventDefault()

    console.log('Form has been submitted')

    if (typeof props.onSubmit === 'function') {
      props.onSubmit(evt)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={props.className ?? ''}>
      {props.children}
    </form>
  )
}
