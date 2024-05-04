import React,{useState,useContext} from 'react'
import styles from './LoginForm.module.css'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import {Link} from 'react-router-dom'
import { Context } from '../..'

export default function LoginForm(props) {
  
  const {store}=useContext(Context)

  const [login, setLogin]=useState();
  const [password, setPassword]=useState();
  let page=props.redirect==="Sign in"?'/login':'/register'

  const link=()=>{
    if(props.redirect==="Sign in"){
      store.register(login,password);
    }else{
      store.login(login,password)
    }
  }
 
  return (
    <div className={styles.container}>
       <h1 className={styles.title}>{props.type}</h1>
        <Input className="add_task_input" value={login} onChange={e=>setLogin(e.target.value)}>{props.type}</Input>
        <Input className="add_task_input" value={password} onChange={e=>setPassword(e.target.value)}>Password</Input>

        <Link to={page} className={styles.underline}><a href='#' className={styles.register}>{props.redirect}</a></Link>
        <div className={styles.btns}>
            <Link to='/' className={styles.underline}><Button className="add cancel">Cancel</Button></Link>
            <Link to='/' className={styles.underline}><Button className="add" onClick={()=>link()}>{props.action}</Button></Link>
        </div>
    </div>
  )
}
