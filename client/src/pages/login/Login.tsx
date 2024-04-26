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
