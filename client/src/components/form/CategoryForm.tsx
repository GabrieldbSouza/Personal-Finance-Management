import { FormEvent, useState } from "react";
import api from "../../services/api";
import styles from "./form.module.css"

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState('');

  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(categoryName)
    const response = await api.post('/user/transaction/category/new', {
      categoryName
    })

    setCategoryName('');
  }
  return (
    <div className={styles.form}>
      <h2>CATEGORY</h2>
      <form onSubmit={hadleSubmit}>
        <input className={styles.input} type="email" value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="Name"/>
        <button className={styles.button} onClick={hadleSubmit}>ENVIAR</button>
      </form>
    </div>
  )
}