import { useEffect, useState } from "react";
import styles from "../assets/dash.module.css";
import api from "../services/api";

interface Transaction {
  transId: number;
  transName: string;
  transDate: string;
  transAmount: number;
  transCategory: number;
  transType: number;
  transCicle: number;
}

interface Filter {
  field: string;
  value: string | number;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await api.get('user/transactions');
      setTransactions(response.data);
      setFilteredTransactions(response.data); // Inicializa com todos os dados
    }
    fetchTransactions();
  }, []);

  const formatDate = (date: string) => {
    return date.substring(0, 10);
  };

  const handleNewTransaction = () => {
    // Implementação para adicionar nova transação
  };

  const addFilter = () => {
    setFilters([...filters, { field: "transName", value: "" }]); // Exemplo: filtro inicial vazio
  };

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const updateFilter = (index: number, field: string, value: string | number) => {
    const newFilters = filters.map((filter, i) => i === index ? { field, value } : filter);
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (appliedFilters: Filter[]) => {
    let tempTransactions = [...transactions];
    appliedFilters.forEach(filter => {
      if (filter.value) {
        tempTransactions = tempTransactions.filter(transaction => {
          const transactionValue = transaction[filter.field as keyof Transaction];
          if (typeof transactionValue === 'string' && typeof filter.value === 'string') {
            return transactionValue.toLowerCase().includes(filter.value.toLowerCase());
          } else {
            return transactionValue === filter.value;
          }
        });
      }
    });
    setFilteredTransactions(tempTransactions);
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleh2}>
        <h2>Expense Tracking</h2>
      </div>
      <div className={styles.Dash}>
        <div className={styles.select}>
          <div className={styles.openDashboard}>
            <button>May Table</button>
            <button>April Table</button>
          </div>
          <div className={styles.selectButton}>
            <button>Filter</button>
            <button>Sort</button>
            <button>Search</button>
            <button onClick={handleNewTransaction}>New</button>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.title}>
            <h3>May 2024 Dashboard</h3>
          </div>
          <div className={styles.filter}>
            <button onClick={addFilter}>+ New Filter</button>
            <button>Add New Transaction</button>
          </div>
          <div>
            {filters.map((filter, index) => (
              <div key={index}>
                <select
                  value={filter.field}
                  onChange={e => updateFilter(index, e.target.value, filter.value)}
                >
                  <option value="transName">Name</option>
                  <option value="transDate">Date</option>
                  <option value="transType">Type</option>
                  <option value="transAmount">Amount</option>
                  <option value="transCategory">Category</option>
                  <option value="transCicle">Cycle</option>
                </select>
                <input
                  type="text"
                  value={filter.value as string}
                  onChange={e => updateFilter(index, filter.field, e.target.value)}
                />
                <button onClick={() => removeFilter(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className={styles.ttable}>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                  <th>Ciclo</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.transId}>
                    <td>{transaction.transId}</td>
                    <td>{transaction.transName}</td>
                    <td>{formatDate(transaction.transDate)}</td>
                    <td>{transaction.transType}</td>
                    <td>{transaction.transAmount}</td>
                    <td>{transaction.transCategory}</td>
                    <td>{transaction.transCicle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
