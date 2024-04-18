import { useNavigate } from 'react-router-dom'
import '../static/NavigationBar.css' 

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
    <div className='NavigationBar'>
      <div className="Logo">
        <button id='Logo' onClick={goToHomePage}>Personal Finance Management</button>
      </div>
      <div className='BtnAccount'>
        <button id='Connect' onClick={goToRegisterPage}>Connect</button>
        <button id='Account' onClick={goToLoginPage}>My Account</button> 
      </div>
    </div>
  )
}

export default NavigationBar