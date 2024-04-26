import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

import Home from './pages/home/Home'
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import User from "./pages/user/User";
import { PrivateRoute } from "./components/isAuthenticated";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>    
        <Route path="/user" element={<PrivateRoute> <User /> </PrivateRoute>}></Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App;

