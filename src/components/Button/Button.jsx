import React from 'react'
import './Button.css'

const Button = ({ type, variant, event, text, disabled=false }) => {
  return (
    <button className={`button ${variant}`} onClick={event} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button