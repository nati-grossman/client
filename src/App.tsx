import React from 'react';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage';
import LanguageSwitcher from "./components/LanguageSwitcher";
import './App.css';


const App: React.FC = () => {
  // <RegisterPage /> <LoginPage />

  return (
    <div>
      <LanguageSwitcher />
      <LoginPage />
      <RegisterPage />
    </div>
  );
};

export default App;
