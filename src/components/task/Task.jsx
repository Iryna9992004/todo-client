import React,{useState,useContext} from 'react'
import styles from './Task.module.css'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import SubTask from '../subtask-list/SubTask'
import EditTask from '../edit-task/EditTask';
import { Context } from '../..';
import Button from '../../UI/Button';

export default function Task(props) {
  const [subtask,setSubtask]=useState(false);
  const [edit, setEdit]=useState(false);
  const {store}=useContext(Context);

  let important=props.important?`${styles.icons} ${styles.icon_important}`:styles.icons

  const updateParentState=(edit)=>{
    setEdit(edit);
  }

  return (
    <div>
    <div className={styles.task}>
      <MdOutlineStar  className={important} onClick={()=>store.markAsImportant(props._id)}/>
         <span className={styles.task__text}>{props.name}</span>
          <div className={styles.task__date}>
              <span className={styles.task__date_name}>Due date: </span>
              <span className={styles.task__date_text}>{props.date}</span>
          </div>
          <Button className="add none" onClick={()=>{setEdit(false);setSubtask(!subtask)}}>Subtasks</Button>
              
          <div className={styles.task__actions}>
                  <MdOutlineEdit className={styles.icons} onClick={()=>{setSubtask(false); setEdit(!edit)}}/>
                  <RiDeleteBin6Fill className={styles.icons} onClick={()=>store.deleteTask(props._id)}/>
          </div>
     </div>
     {subtask?<SubTask subtaskList={props.subtaskList}/>:''}
     {edit?<EditTask updateParentState={updateParentState} _id={props._id}/>:''}
     </div>
  )
}
