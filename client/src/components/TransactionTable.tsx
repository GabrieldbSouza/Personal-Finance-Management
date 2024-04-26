import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Importe o axiosInstance

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('http://127.0.0.1:5000/transaction');
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
