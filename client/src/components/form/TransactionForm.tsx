import { FormEvent, useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./form.module.css";

export default function TransactionForm() {
  const [transName, setTransName] = useState('');
  const [transDate, setTransDate] = useState('');
  const [transAmount, setTransAmount] = useState('');
  const [transCategory, setTransCategory] = useState('');
  const [transType, setTransType] = useState('');
  const [transCicle, setTransCicle] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [cicleOptions, setCicleOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const categoryResponse = await api.get('/user/transaction/categories');
        setCategoryOptions(categoryResponse.data);
        
        const typeResponse = await api.get('/user/transaction/types');
        setTypeOptions(typeResponse.data);
        
        const cicleResponse = await api.get('/user/transaction/cicles');
        setCicleOptions(cicleResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }

    fetchOptions();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.post('/user/transaction/new', {
      transName,
      transDate,
      transAmount,
      transCategory,
      transType,
      transCicle
    });

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
      <form onSubmit={handleSubmit}>
        <input className={styles.input} type="name" value={transName} onChange={e => setTransName(e.target.value)} placeholder="Name"/>
        <input className={styles.input} type="date" value={transDate} onChange={e => setTransDate(e.target.value)} placeholder="Date"/>
        <input className={styles.input} type="amount" value={transAmount} onChange={e => setTransAmount(e.target.value)} placeholder="Amount"/>
        <select className={styles.select} value={transCategory} onChange={e => setTransCategory(e.target.value)}>
          <option value="">Category</option>
          {categoryOptions.map(option => (
            <option key={option.categoryId} value={option.categoryName}>{option.categoryName}</option>
          ))}
        </select>
        <select className={styles.select} value={transType} onChange={e => setTransType(e.target.value)}>
          <option value="">Type</option>
          {typeOptions.map(option => (
            <option key={option.typeId} value={option.typeName}>{option.typeName}</option>
          ))}
        </select>
        <select className={styles.select} value={transCicle} onChange={e => setTransCicle(e.target.value)}>
          <option value="">Cycle</option>
          {cicleOptions.map(option => (
            <option key={option.cicleId} value={option.cicleName}>{option.cicleName}</option>
          ))}
        </select>
        <button className={styles.button} type="submit">ENVIAR</button>
      </form>
    </div>
  );
}
