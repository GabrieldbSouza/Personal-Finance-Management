import { useState } from 'react';
import TransactionTable from '../../components/TransactionTable';
import TransactionForm from '../../components/form/transactions';
import TypeForm from '../../components/form/type';
import CategoryForm from '../../components/form/category';

const User = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const toggleShowTransactions = () => {
    setShowTransactions(prevState => !prevState);
  };

  const toggleShowTransactionForm = () => {
    setShowTransactionForm(prevState => !prevState);
  };

  const toggleShowTypeForm = () => {
    setShowTypeForm(prevState => !prevState);
  };

  const toggleShowCategoryForm = () => {
    setShowCategoryForm(prevState => !prevState);
  };

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={toggleShowTransactions}>Show Transactions</button>
      <button onClick={toggleShowTransactionForm}>Add Transaction</button>
      <button onClick={toggleShowTypeForm}>Add Type</button>
      <button onClick={toggleShowCategoryForm}>Add Category</button>

      {showTransactions && <TransactionTable />}
      {showTransactionForm && <TransactionForm />}
      {showTypeForm && <TypeForm />}
      {showCategoryForm && <CategoryForm />}
    </div>
  );
};

export default User;
