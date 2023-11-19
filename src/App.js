import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/home";
import Login from "./components/login";
import NoPage from "./components/nopage";
import { createContext, useEffect, useState } from "react";
import UserContext from "./context";
import CustomerDetailPage from "./components/customerDetails";


function App() {
  const [loginDetails, setloginDetails] = useState(()=>{
    let token = localStorage.getItem('authToken') || null
    return {login:token ? true : false,authToken:token ?? ''}
  });

  useEffect(()=> {
    if (loginDetails.authToken) {
      localStorage.setItem('authToken', loginDetails.authToken);
    }

  },[loginDetails])

  return (
    <UserContext.Provider value={loginDetails}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setlogin={setloginDetails}/>} />
        
    
      <Route path='home' element={<Home />} />
      <Route path='newCustomer' element={<CustomerDetailPage />} />

      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
