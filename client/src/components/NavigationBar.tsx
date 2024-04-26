import { useNavigate, useLocation } from 'react-router-dom';
import styles from './navigationBar.module.css';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isUserPage = location.pathname === '/user';
  const isNotUserPage = !isUserPage;

  return (
    <div className={styles.navigationBar}>
      <div className={styles.logo}>
        <button className={styles.button} onClick={goToHome}>Personal Finance Management</button>
      </div>
      <div className={styles.sign}>
        {isUserPage && <button className={styles.button} onClick={handleLogout}>Logout</button>}
        {isNotUserPage && <button className={styles.button} onClick={goToRegister}>Connect</button>}
        <button className={styles.button} onClick={goToLogin}>Account</button>
      </div>
    </div>
  );
}

export default NavigationBar;
