import React from 'react'
import styles from './SignInPage.module.css'
import LoginForm from '../../modules/LoginForm/LoginForm'

export default function SignInPage() {
  return (
    <div className={styles.container}>
        <LoginForm redirect="Sign up" action="Sign in" type="Login"/>
    </div>
  )
}
