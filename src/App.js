import logo from './logo.svg';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadingProvider } from './components/LoadingContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { AuthView } from './views/AuthView';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import "./components/assets/sass/variable.scss";
import "./components/assets/sass/style.scss";

export const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    
    <div className="App">
        <LoadingProvider>
      <Router basename="/">
    
        <Routes>
          <Route path="/*" element={<AuthView />} > </Route>
        </Routes>
        <ToastContainer /> {/* Render ToastContainer */}
        
      </Router>
      </LoadingProvider>
      
    </div>
  );
}

export default App;
