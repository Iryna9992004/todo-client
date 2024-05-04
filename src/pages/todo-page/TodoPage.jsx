import React,{useState} from 'react'
import styles from './TodoPage.module.css'
import TodoList from '../../modules/TodoList/TodoList'
import AddTodoMenu from '../../modules/AddTodoMenu/AddTodoMenu'

export default function TodoPage() {
  const [addMenu, setMenu]=useState(false);

  let toggleMenu=addMenu?styles.wrapper:`${styles.wrapper} ${styles.wrapper__open}`

  const openMenu=(childsState)=>{
    setMenu(childsState);
  }

  return (
    <div>
         <div className={toggleMenu}>
         <TodoList openParentMenu={openMenu}/>
         {addMenu?<AddTodoMenu openParentMenu={openMenu}/>:''}
        </div>
    </div>
  )
}
