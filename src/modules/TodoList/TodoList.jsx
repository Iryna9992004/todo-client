import React, { useState, useEffect, useContext,useMemo} from 'react';
import styles from './TodoList.module.css';
import SearchForm from '../../components/search-form/SearchForm';
import ListOptions from '../../components/list-options/ListOptions';
import Task from '../../components/task/Task';
import Button from '../../UI/Button';
import { Link } from 'react-router-dom';
import $api from '../../http';
import EmptyList from '../../components/empty/EmptyList';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const TodoList = observer((props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [option, setOption]=useState();
  const [search,setSearch]=useState();

  const { store } = useContext(Context);

  const sortList=()=>{
    if(option==='Sort by name'){
      const sortedtasks=[...taskList].sort((a,b)=>{
        const textA=a.text.toLowerCase();
        const textB=b.text.toLowerCase();
        return textA.localeCompare(textB);
      })
      setTaskList(sortedtasks);
     }
    if(option==='Sort by date'){
      const sortedTasks=[...taskList].sort((a,b)=>{
        const dateA=new Date(a.date).getTime();
        const dateB=new Date(b.date).getTime();
        return dateA-dateB;
      });
      setTaskList(sortedTasks);
    }
  }

  useEffect(() => {
    const tex = async () => {
      try {
        const login = sessionStorage.getItem('login');
        const response = await $api.post('/taskList', { login });
        console.log(response.data.tasks);
        setTaskList(response.data.tasks);
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    };
    tex();
  }, [store.listTasks, store.isAuth]);

  useEffect(()=>sortList(),[option]);
  
  const getOptionValue=(value)=>{
   setOption(value);
  }


  const open = () => {
    setOpenMenu(!openMenu); 
    props.openParentMenu(!openMenu);
  };

  let openToggle = openMenu ? `${styles.list} ${styles.menu_open}` : styles.list;

  const sortedList=useMemo(()=>{
    return taskList.filter(item=>item.text.toLowerCase().includes(search))
  },[search])

  return (
    <div className={openToggle}>
      <div className={styles.list__head}>
        <div className={styles.title}>Tasks to do</div>
        <div className={styles.btns}>
          <Link to="/login" className={styles.underline}>
            <Button className="add sign-in">Sign in</Button>
          </Link>
          <Link to="/register" className={styles.underline}>
            <Button className="add sign-in">Sign up</Button>
          </Link>
        </div>
      </div>

       <SearchForm value={search} setSearch={setSearch}/>

      <ListOptions getOptionValue={getOptionValue}/>

      <Button className="add" onClick={open}>
        <div className={styles.add__plus}>+</div>
        <span>Add new Task</span>
      </Button>

      {search?(sortedList.map((item) => (
        <Task _id={item._id} key={item._id} name={item.text} date={item.date} subtaskList={item.subtasks} important={item.important}/>
        
      ))):
      (taskList.map((item)=><Task _id={item._id} key={item._id} name={item.text} date={item.date} subtaskList={item.subtasks} important={item.important}/>))}

      {search?(sortedList.length===0? <EmptyList /> : ''):(taskList.length===0?<EmptyList /> : '')}
    </div>
  );
});

export default TodoList;
