import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import api from "../services/api";
import styles from "./chart.module.css";

enum ChartType {
  LineChart = 'LineChart',
  ColumnChart = 'ColumnChart',
}

interface Transaction {
  transId: number;
  transName: string;
  transDate: string;
  transAmount: number;
  transCategory: number;
  transType: number;
  transCicle: number;
}

export default function TransactionChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartType, setChartType] = useState<ChartType>(ChartType.ColumnChart);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await api.get('user/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    }
    fetchTransactions();
  }, []);

  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <div className={styles.chart}>
      <div className={styles.select}>
        <button onClick={() => handleChartTypeChange(ChartType.LineChart)}>Gráfico de Linha</button>
        <button onClick={() => handleChartTypeChange(ChartType.ColumnChart)}>Gráfico de Colunas</button>
      </div>
      <Chart
        width={'1200px'}
        height={'500px'}
        chartType={chartType}
        loader={<div>Carregando gráfico...</div>}
        data={[
          ['Data', 'Transaction'],
          ...transactions.map(transaction => [transaction.transDate, transaction.transAmount])
        ]}
        options={{
          title: 'Transações',
          hAxis: { title: 'Data' },
          vAxis: { title: 'Amount' },
          curveType: 'function',
          legend: { position: 'bottom' },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
}
