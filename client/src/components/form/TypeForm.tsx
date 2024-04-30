import { FormEvent, useState } from "react";
import api from "../../services/api";
import styles from "./form.module.css"

export default function TypeForm() {
  const [typeName, setTypeName] = useState('');

  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await api.post('/user/transaction/type/new', {
      typeName
    })

    setTypeName('');
  }
  return (
    <div className={styles.form}>
      <h2>TYPE</h2>
      <form onSubmit={hadleSubmit}>
        <input className={styles.input} type="email" value={typeName} onChange={e => setTypeName(e.target.value)} placeholder="Name"/>
        <button className={styles.button} onClick={hadleSubmit}>ENVIAR</button>
      </form>
    </div>
  )
}