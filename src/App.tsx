import React from 'react';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage';
import LanguageSwitcher from "./components/LanguageSwitcher";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'components/HomePage';


const App: React.FC = () => {
  // <RegisterPage /> <LoginPage />

  return (
    <>
      <LanguageSwitcher />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/homePage' element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
