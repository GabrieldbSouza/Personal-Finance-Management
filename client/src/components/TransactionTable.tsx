import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "./table.module.css"

interface Transaction {
  transId: number;
  transName: string;
  transDate: string;
  transAmount: number;
  transCategory: number;
  transType: number;
  transCicle: number;
}

export default function TransactionTable() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function Transaction() {
      const response = await api.get('user/transactions');
        setTransactions(response.data);
    }
    Transaction();
  }, [])

  return (
    <div className={styles.table}>
      <h2>Transações</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Ciclo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.transId}>
              <td>{transaction.transId}</td>
              <td>{transaction.transName}</td>
              <td>{transaction.transDate}</td>
              <td>{transaction.transAmount}</td>
              <td>{transaction.transCategory}</td>
              <td>{transaction.transType}</td>
              <td>{transaction.transCicle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}