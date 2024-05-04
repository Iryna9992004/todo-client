import React from 'react'
import './Input.css'

export default function Input(props) {

  return (
    <input type={props.type} class={props.className} placeholder={props.children} value={props.value} onChange={props.onChange}/>
  )
}
