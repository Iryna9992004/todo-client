import React,{useState,useEffect} from 'react'
import styles from './ListOptions.module.css'

export default function ListOptions(props) {
  const [option,setOption]=useState();
  
  const makeSort=()=>{
    props.getOptionValue(option);
    console.log(option);
  }

  useEffect(()=>{
    makeSort();
  },[option])

  return (
    <div className={styles.list__options}>
    <select className={styles.list__sort} value={option} onChange={e=>setOption(e.target.value)}>
      <option className={styles.list__sort_item}>Sort Tasks</option>
      <option className={styles.list__sort_item}>Sort by name</option>
      <option className={styles.list__sort_item}>Sort by date</option>
    </select>
    </div>
  )
}
