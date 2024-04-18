import { useNavigate } from 'react-router-dom'
import styles from '../static/NavigationBar.module.css' 

function NavigationBar() {

  const navigation = useNavigate();
  const goToLoginPage = () => {
    navigation('/login');
  }
  const goToRegisterPage = () => {
    navigation('/register')
  }

  const goToHomePage = () =>{
    navigation('/')
  }
  return (
    <div className={styles.NavigationBar}>
      <div className={styles.Logo}>
        <button id='Logo' className={styles.Logo} onClick={goToHomePage}>Personal Finance Management</button>
      </div>
      <div className={styles.BtnAccount}>
        <button id='Connect' className={styles.Connect} onClick={goToRegisterPage}>Connect</button>
        <button id='Account' className={styles.Account} onClick={goToLoginPage}>My Account</button> 
      </div>
    </div>
  )
}

export default NavigationBar