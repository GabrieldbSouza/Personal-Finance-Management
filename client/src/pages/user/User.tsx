import { useState } from 'react';
import styles from "./user.module.css";
import CategoryForm from "../../components/form/CategoryForm";
import CicleForm from "../../components/form/CicleForm";
import TypeForm from "../../components/form/TypeForm";
import TransactionForm from "../../components/form/TransactionForm";
import TransactionTable from '../../components/TransactionTable';

export default function User() {
  const [currentForm, setCurrentForm] = useState<string | null>(null);

  const handleButtonClick = (formName: string) => {
    setCurrentForm(formName);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navform}>
        <button className={styles.button} onClick={() => handleButtonClick('category')}>Add Category</button>
        <button className={styles.button} onClick={() => handleButtonClick('cicle')}>Add Cicle</button>
        <button className={styles.button} onClick={() => handleButtonClick('type')}>Add Type</button>
        <button className={styles.button} onClick={() => handleButtonClick('transaction')}>Add Transaction</button>
        <button className={styles.button} onClick={() => handleButtonClick('showTransaction')}>Show Transaction</button>
      </div>
      <div className="form">
          {currentForm === 'category' && <CategoryForm />}
          {currentForm === 'cicle' && <CicleForm />}
          {currentForm === 'type' && <TypeForm />}
          {currentForm === 'transaction' && <TransactionForm />}
          {currentForm === 'showTransaction' && <TransactionTable />}
        </div>
    </div>
  );
}
