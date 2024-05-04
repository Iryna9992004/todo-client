import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import CheckBox from '../../UI/CheckBox';
import $api from '../../http';

export default function SubtaskInput(props) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [changeList, setChangeList] = useState(false);
  const [choose, setChoose] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = sessionStorage.getItem('login');
        const response = await $api.post('/subtaskList', { login: user });
        setSubtasks(response.data.subtasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [changeList]);

  const create = async () => {
    try {
      const user = sessionStorage.getItem('login');
      await $api.post('/addSubtask', { user, text, date });
      setChangeList(!changeList);
      setText('');
      setDate('');
    } catch (error) {
      console.log(error);
    }
  };

  const sendListToParent=()=>{
    props.addSubtasksList(choose);
  }

  return (
    <div>
      <Input className="add_task_input" value={text} onChange={(e) => setText(e.target.value)}>
        Name of subtask:
      </Input>

      <input type="date" className="add_task_input" value={date} onChange={(e) => setDate(e.target.value)} />
      <Button className="add" onClick={create}>
        <span className="add__text left">Save subtask</span>
      </Button>

      <span style={{ fontWeight: 600, fontSize: 20 }}>Subtask list</span>


      {subtasks.map(item => (
        <CheckBox key={item._id} onClick={() => setChoose(prevChoose => [...prevChoose, { text: item.text, date: item.date }])}>
          {item.text} {item.date}
        </CheckBox>
      ))}

      <span style={{ fontWeight: 600, fontSize: 20 }}>Choosen subtasks</span>

      {choose.map((item, index) => (
        <CheckBox key={index}>
          {item.text} {item.date}
        </CheckBox>
      ))}

      <Button className="add" onClick={sendListToParent}>
        <span className="add__text left">Add choosen subtasks</span>
      </Button>
    </div>
  );
}

