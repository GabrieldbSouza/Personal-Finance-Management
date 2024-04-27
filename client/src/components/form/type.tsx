import { useState } from 'react';
import axiosInstance from '.././axiosInstance'; // Importe o axiosInstance

const TypeForm = () => {
  const [type, setType] = useState('');

  const handleChange = (e:any) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://127.0.0.1:5000/user/type/new', { type });
      alert('Tipo enviado com sucesso!');
      setType('');
    } catch (error) {
      console.error('Erro ao enviar tipo:', error);
      alert('Erro ao enviar tipo. Por favor, tente novamente.');
    }
  };
  return (
    <div>
      <h2>Enviar Tipo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo:
          <input type="text" value={type} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default TypeForm;
