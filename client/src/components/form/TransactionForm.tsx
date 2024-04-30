import { FormEvent, useState } from "react";
import api from "../../services/api";
import styles from "./form.module.css"

export default function TransactionForm() {
  const [transName, setTransName] = useState('');
  const [transDate, setTransDate] = useState('');
  const [transAmount, setTransAmount] = useState('');
  const [transCategory, setTransCategory] = useState('');
  const [transType, setTransType] = useState('');
  const [transCicle, setTransCicle] = useState('');

  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await api.post('/user/transaction/new', {
      transName,
      transDate,
      transAmount,
      transCategory,
      transType,
      transCicle
    })

    setTransName('');
    setTransDate('');
    setTransAmount('');
    setTransCategory('');
    setTransType('');
    setTransCicle('');
  }
  return (
    <div className={styles.form}>
      <h2>TRANSACTION</h2>
      <form onSubmit={hadleSubmit}>
        <input className={styles.input} type="name" value={transName} onChange={e => setTransName(e.target.value)} placeholder="Name"/>
        <input className={styles.input} type="date" value={transDate} onChange={e => setTransDate(e.target.value)} placeholder="Date"/>
        <input className={styles.input} type="amount" value={transAmount} onChange={e => setTransAmount(e.target.value)} placeholder="Amount"/>
        <input className={styles.input} type="category" value={transCategory} onChange={e => setTransCategory(e.target.value)} placeholder="Category"/>
        <input className={styles.input} type="type" value={transType} onChange={e => setTransType(e.target.value)} placeholder="Type"/>
        <input className={styles.input} type="cicle" value={transCicle} onChange={e => setTransCicle(e.target.value)} placeholder="Cicle"/>
        <button className={styles.button} onClick={hadleSubmit}>ENVIAR</button>
      </form>
    </div>
  )
}