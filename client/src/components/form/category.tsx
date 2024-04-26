import { useState } from 'react';
import axiosInstance from '.././axiosInstance'; // Importe o axiosInstance

const CategoryForm = () => {
  const [category, setCategory] = useState('');

  const handleChange = (e:any) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://127.0.0.1:5000/user/category/new', { catName: category });
      alert('Categoria enviada com sucesso!');
      setCategory('');
    } catch (error) {
      console.error('Erro ao enviar categoria:', error);
      alert('Erro ao enviar categoria. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Enviar Categoria</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Categoria:
          <input type="text" value={category} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CategoryForm;
