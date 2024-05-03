import styles from "./register.module.css"
import { FormEvent, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(userName)
    console.log(userEmail)
    console.log(userPassword)

    const response = await api.post('/register', {
      userName,
      userEmail,
      userPassword
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    navigate('/user');
  }

  return (
    <div className={styles.form}>
      <h2>REGISTER</h2>
      <form onSubmit={hadleSubmit}>
      <input className={styles.input} type="name" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Name" />
        <input className={styles.input} type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Email" />
        <input className={styles.input} type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="Password" />
        <button className={styles.button} onClick={hadleSubmit}>REGISTER</button>
      </form>
    </div>
  )
}
/*import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import styles from './register.module.css'

function Register() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/register",
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
      localStorage.setItem('accessToken', accessToken);
      if (accessToken && typeof accessToken === 'string' && accessToken.trim() !== '') {
        navigate('/user');
      } else {
        navigate('/register');
      }
    }).catch(error => {
      if (error.response) {
        alert("Erro no registro: " + error.response.data.error);
      } else if (error.request) {
        console.log(error.request);
      } else {
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
    <div className={styles.form}>
      <h2>Register</h2>
      <form onSubmit={register}>
        <input type="text" value={registerForm.name} onChange={handleChange} name="name" placeholder="Name"/>
        <input type="email" value={registerForm.email} onChange={handleChange} name="email" placeholder='Email'/>
        <input type="password" value={registerForm.password} onChange={handleChange} name="password" placeholder='Password'/>
        <input className={styles.button} type="submit" value="Register" />
      </form>
      <button onClick={goToLogin}>Já possui uma conta? Então comece agora!</button>
    </div>
  )
}

export default Register;
*/
