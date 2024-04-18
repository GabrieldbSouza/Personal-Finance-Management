import NavigationBar from './../../components/NavigationBar';
import styles from './HomePage.module.css'

function HomePage(){
  return (
    <div className={styles.HomePage}>
      <NavigationBar />
      <div className={styles.Page}>
        <div className={styles.Introduction}>
          <h1>Gerencie seu orçamento<br /> de maneira<br /> eficaz.</h1>
          <h6>O aplicativo fornece um plano de orçamento<br /> pessoal e informa quanto você pode gastar hoje.</h6>
          <div className={styles.Login}>
          <form action="" method="">
            <input id='Login' className={styles.Login} type="text" placeholder='Seu endereço de email'/>
            <input id='Submit' className={styles.Submit} type="submit" value="Entrar"/>
          </form>
        </div>
        </div>
        <div className={styles.Figure}>
          <img src="src/assets/001.svg" alt="" />
        </div>
      </div>
      <div className={styles.Github}>
        <a href="https://github.com/GabrieldbSouza/Personal-Finance-Management.git" target="_blank" rel="noopener noreferrer">
          <img src="src/assets/github-mark.svg" alt="" />
        </a>
      </div>
    </div>
  )
}

export default HomePage