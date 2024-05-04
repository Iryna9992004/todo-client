import React,{useState,useContext} from 'react'
import Input from '../../UI/Input'
import styles from './EditTask.module.css'
import Button from '../../UI/Button'
import { Context } from '../../index'

export default function EditTask(props) {
  const [newDate,setNewDate]=useState();
  const [newText,setNewText]=useState();
  const {store}=useContext(Context);

  const close=()=>{
    props.updateParentState(false);
  }

  return (
    <div className={styles.edit__container}>
      <div className={styles.input}>
        <input type="date" className={styles.date_input} value={newDate} onChange={e=>setNewDate(e.target.value)}/>
        <Input className={styles.add_task_input1} value={newText} onChange={e=>setNewText(e.target.value)}>Name of task:</Input>
      </div>
        
        <Button className='add left' onClick={()=>{store.editTask(props._id,newText,newDate); close()}}>Edit</Button> 
    </div>
  )
}
