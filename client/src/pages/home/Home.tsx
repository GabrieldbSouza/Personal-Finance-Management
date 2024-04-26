import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }
  return (
    <>
      <div className={styles.page}>
        <div className={styles.introduction}>
          <h1>Gerencie seu orçamento<br /> de maneira<br /> eficaz.</h1>
          <h6>O aplicativo fornece um plano de orçamento<br /> pessoal e informa quanto você pode gastar hoje.</h6>
          <div className={styles.button}>
            <button onClick={goToLogin}>Começar</button>
          </div>
        </div>
        <div className={styles.figure}>
          <img src="src/assets/001.svg" alt="" />
        </div>
      </div>
    </>
  )
}

export default Home;