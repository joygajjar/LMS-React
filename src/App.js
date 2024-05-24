import logo from './logo.svg';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/assets/css/variable.css';
import './components/assets/css/style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { AuthView } from './views/AuthView';
import { ToastContainer } from 'react-toastify';
export const App = () => {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/*" element={<AuthView />} >
            </Route>
            
        </Routes>
        <ToastContainer /> {/* Render ToastContainer */}
      </Router>
    </div>
  );
}

export default App;
