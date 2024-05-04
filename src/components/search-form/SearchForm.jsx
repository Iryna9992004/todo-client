import React from 'react'
import styles from './SearchForm.module.css'
import Input from '../../UI/Input'

export default function SearchForm(props) {
  return (
    <form className={styles.search_form}>
        <div className={styles.input_group}>
            <div className={styles.input_group2}>
                <label>
                    <Input type="search" className="search_field" value={props.value} onChange={e=>props.setSearch(e.target.value)}>Tap to find a task . . .</Input>
                </label>
            </div>
        </div>
    </form>
  )
}
