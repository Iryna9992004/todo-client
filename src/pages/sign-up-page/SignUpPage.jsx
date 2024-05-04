import React from 'react'
import LoginForm from '../../modules/LoginForm/LoginForm'
import styles from './SignUpPage.module.css'

export default function SignUpPage() {
  return (
    <div className={styles.container}><LoginForm redirect="Sign in" action="Sign up" type="Registration"/></div>
  )
}
