import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage'
import UserPage from './pages/user/UserPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} /> 
        <Route path='/userpage' element={<UserPage />} />           
      </Routes>
    </BrowserRouter>
  )
}

export default App;