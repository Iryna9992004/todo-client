import React, { useState,useContext } from 'react';
import styles from './AddTodoMenu.module.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import SubtaskInput from '../../components/subtask-input/SubtaskInput';
import { Context } from '../..';

export default function AddTodoMenu(props) {
  const [subtask, setSubtask] = useState(false);
  const [text, setText] = useState();
  const [date, setDate] = useState();
  const [subtasks, setSubtasks] = useState([]);

  const {store}=useContext(Context);

  const close = () => {
    props.openParentMenu(false);
  };

  const addSubtasks=(data)=>{
     setSubtasks(data)
  }

  const create = async () => {
    store.addTask(text,date,subtasks);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menu__name}>Task:</div>
      <Input className="add_task_input" value={text} onChange={(e) => setText(e.target.value)}>
        Name of task:
      </Input>

      <input type="date" className="add_task_input" value={date} onChange={(e) => setDate(e.target.value)} />

      <div className={styles.menu__subtasks}>
        <Button className="add" onClick={() => setSubtask(!subtask)}>
          <div className={styles.add__plus}>+</div>
          <span className="add__text">Add new subtask</span>
        </Button>

        {subtask ? <SubtaskInput addSubtasksList={addSubtasks} /> : ''}

        <div className={styles.btns}>
          <Button className="add cancel" onClick={close}>
            Cancel
          </Button>
          <Button className="add save" onClick={create}>
            Save Task
          </Button>
        </div>
      </div>
    </div>
  );
}
