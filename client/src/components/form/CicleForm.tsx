import { FormEvent, useState } from "react";
import api from "../../services/api";
import styles from "./form.module.css"

export default function CicleForm() {
  const [cicleName, setCicleName] = useState('');

  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await api.post('/user/transaction/cicle/new', {
      cicleName
    })

    setCicleName('');
  }
  return (
    <div className={styles.form}>
      <h2>CICLE</h2>
      <form onSubmit={hadleSubmit}>
        <input className={styles.input} type="email" value={cicleName} onChange={e => setCicleName(e.target.value)} placeholder="Name"/>
        <button className={styles.button} onClick={hadleSubmit}>ENVIAR</button>
      </form>
    </div>
  )
}