import styles from "./login.module.css"
import { FormEvent, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault();
        
    const response = await api.post('/login', {
      userEmail,
      userPassword
    });
    localStorage.setItem('accessToken', response.data);
    navigate('/user');
  }

  return (
    <div className={styles.form}>
      <h2>LOGIN</h2>
      <form onSubmit={hadleSubmit}>
        <input className={styles.input} type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
        <input className={styles.input} type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
        <button className={styles.button} onClick={hadleSubmit}>LOGIN</button>
      </form>
    </div>
  )
}

/*
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'

function Login() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  }

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  function handleEmailChange(e: any) {
    const { value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      email: value
    }));
  }

  function handlePasswordChange(e: any) {
    const { value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      password: value
    }));
  }

  function login(e: any) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      data: {
        email: loginForm.email,
        password: loginForm.password
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => {
      const {accessToken } = resp.data;

      if (accessToken && typeof accessToken === 'string' && accessToken.trim() !== '') {
        localStorage.setItem('token', accessToken);
        navigate('/user');
    } else{
        navigate('/login');
    }
    }).catch(error => {
      alert("Erro no login: " + error.response.data.message);
    });
    setLoginForm({
      email: "",
      password: ""
    });
  }
  return (
    <div className={styles.form}>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input type="email" value={loginForm.email} onChange={handleEmailChange} placeholder='Email'/>
        <input type="password" value={loginForm.password} onChange={handlePasswordChange} placeholder='Password'/>
        <input className={styles.button} type="submit" value="Entrar" />
      </form>
      <button onClick={goToRegister}>Ainda não tem uma conta? Crie uma agora!</button>
    </div>
  )
}

export default Login;

*/
