import { useState } from 'react';
import axiosInstance from '.././axiosInstance'; // Importe o axiosInstance

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    transName: '',
    transUserId: '',
    transDate: '',
    transAmount: '',
    transType: '',
    transCategory: ''
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://127.0.0.1:5000/user/transaction/new', {
        name: formData.transName,
        userId: formData.transUserId,
        date: formData.transDate,
        amount: formData.transAmount,
        type: formData.transType,
        category: formData.transCategory
      });
      alert('Transação enviada com sucesso!');
      setFormData({
        transName: '',
        transUserId: '',
        transDate: '',
        transAmount: '',
        transType: '',
        transCategory: ''
      });
    } catch (error) {
      console.error('Erro ao enviar transação:', error);
      alert('Erro ao enviar transação. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Enviar Transação</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="transName" value={formData.transName} onChange={handleChange} />
        </label>
        <label>
          ID do Usuário:
          <input type="number" name="transUserId" value={formData.transUserId} onChange={handleChange} />
        </label>
        <label>
          Data:
          <input type="date" name="transDate" value={formData.transDate} onChange={handleChange} />
        </label>
        <label>
          Valor:
          <input type="number" name="transAmount" value={formData.transAmount} onChange={handleChange} />
        </label>
        <label>
          Tipo:
          <input type="text" name="transType" value={formData.transType} onChange={handleChange} />
        </label>
        <label>
          Categoria:
          <input type="text" name="transCategory" value={formData.transCategory} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default TransactionForm;
