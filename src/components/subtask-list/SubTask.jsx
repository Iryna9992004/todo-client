import React from 'react';
import styles from './SubTask.module.css';

export default function SubTask(props) {
  return (
    <div className={styles.subtask_list}>
      {props.subtaskList.map(item => (
        <table className={styles.table} key={item._id}>
          <tr className={styles.table__item} >
            <td>
              <span className={styles.table__text}>{item.text}</span>
            </td>
            <td>
              <span className={styles.table__text}>{item.date}</span>
            </td>
          </tr>
        </table>
      ))}
    </div>
  );
}
