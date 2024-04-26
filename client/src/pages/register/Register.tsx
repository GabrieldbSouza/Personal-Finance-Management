import { useState } from "react";
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
