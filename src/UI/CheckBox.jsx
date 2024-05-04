import React from 'react'
import styles from './CheckBox.module.css'

export default function CheckBox(props) {
  return (
    <div>
        <button name={props.name} className={styles.checkbox1} onClick={props.onClick}>{props.children} </button>
    </div>
  )
}
