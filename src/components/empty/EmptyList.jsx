import React from 'react'
import styles from './EmptyList.module.css'

export default function EmptyList() {
  return (
    <div className={styles.empty__container}>The list is empty!</div>
  )
}
