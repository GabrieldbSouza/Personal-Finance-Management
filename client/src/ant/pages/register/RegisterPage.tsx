import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from './../../components/NavigationBar';
import styles from './RegisterPage.module.css'

function RegisterPage() {

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigation = useNavigate();

  function handleChange(event: any) {
    const { name, value } = event.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function btnRegister(event: any) {
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
      const { id, name, email, accessToken } = response.data;
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      console.log("AccessToken:", accessToken);
      localStorage.setItem('accessToken', accessToken);
      if (accessToken && typeof accessToken === 'string' && accessToken.trim() !== '') {
        navigation('/userpage');
    } else{
        navigation('/register');
    }
    }).catch(error => {
      if (error.response) {
        // O servidor retornou uma resposta com um código de status diferente de 2xx
        // Exiba a mensagem de erro para o usuário
        alert("Erro no registro: " + error.response.data.error);
      } else if (error.request) {
        // O pedido foi feito, mas não recebeu resposta
        console.log(error.request);
      } else {
        // Ocorreu um erro durante o processamento do pedido
        console.log('Error', error.message);
      }
    });

    setRegisterForm({
      name: "",
      email: "",
      password: ""
    });
  }

  return (
    <div className="RegisterPage">
      <NavigationBar />
      <div className={styles.Page}>
        <form onSubmit={btnRegister}>
          <input type="text" value={registerForm.name} onChange={handleChange} name="name" placeholder='Nome'/>
          <input type="email" value={registerForm.email} onChange={handleChange} name="email" placeholder='Email'/>
          <input type="password" value={registerForm.password} onChange={handleChange} name="password" placeholder='Password'/>
          <input id='Submit' className={styles.Submit} type="submit" value="Cadastrar" />
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
