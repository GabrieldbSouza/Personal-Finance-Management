import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from './../../components/NavigationBar';

function LoginPage(props: any) {

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const navigation = useNavigate();

  function handleChange(event: any) {
    const { name, value } = event.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function btnLogin(event: any) {
    event.preventDefault(); // Impede o envio do formulário padrão
    axios({
      method: "POST",
      url: "http://127.0.0.1:5001/login",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    }).then((response) => {
      const {accessToken } = response.data;
      console.log("AccessToken:", accessToken);
      
      if (accessToken && typeof accessToken === 'string' && accessToken.trim() !== '') {
        navigation('/userpage');
    } else{
        navigation('/login');
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
    <div className="LoginPage">
      <NavigationBar />
      <div className="Page">
        <form onSubmit={btnLogin}>
          <input type="email" value={loginForm.email} onChange={handleChange} name="email" placeholder='Email' />
          <input type="password" value={loginForm.password} onChange={handleChange} name="password" placeholder='Password' />
          <input id='Submit' type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
