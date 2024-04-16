import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from './../../components/NavigationBar';
import './RegisterPage.css'

function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigation = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function btnRegister(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    axios({
      method: "POST",
      url: "http://127.0.0.1:5001/register",
      data: {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password
      }
    }).then((response) => {
      // Se o registro for bem-sucedido, redirecione para a página do usuário
      localStorage.setItem('email', registerForm.email);
      navigation('/userpage');
    }).catch(error => {
      alert("Erro no registro: " + error.response.data.message);
    });

    // Limpa os campos do formulário após o registro
    setRegisterForm({
      name: "",
      email: "",
      password: ""
    });
  }

  return (
    <div className="RegisterPage">
      <NavigationBar />
      <div className="Page">
        <form onSubmit={btnRegister}>
          <input type="text" value={registerForm.name} onChange={handleChange} name="name" placeholder='Nome'/>
          <input type="email" value={registerForm.email} onChange={handleChange} name="email" placeholder='Email'/>
          <input type="password" value={registerForm.password} onChange={handleChange} name="password" placeholder='Password'/>
          <input id='Submit' type="submit" value="Cadastrar" />
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
