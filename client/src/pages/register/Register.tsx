import { useForm } from "react-hook-form";
import { useState } from 'react'; 
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email({ message: "Insira um email válido" }).min(1, { message: "O email é obrigatório" }),
  password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }).min(1, { message: "A senha é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post('/register', {
        userName: data.name,
        userEmail: data.email,
        userPassword: data.password
      });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      
      navigate('/user');
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Usuário já cadastrado. Por favor, escolha outro email.");
      } else {
        console.error('Erro ao registrar:', error);
        setErrorMessage("Erro ao registrar. Por favor, tente novamente mais tarde.");
      }
    }
  }

  return (
    <div className={styles.form}>
      <h2>REGISTER</h2>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.input} type="name" {...register("name")} placeholder="Name" />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        <input className={styles.input} type="email" {...register("email")} placeholder="Email" />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        <input className={styles.input} type="password" {...register("password")} placeholder="Password" />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        <button className={styles.button} type="submit">REGISTER</button>
      </form>
    </div>
  )
}
