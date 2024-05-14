import {Route, Routes, } from 'react-router-dom'
import React from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Login } from '../components/login';
export const AuthView = () => {
    return (<React.Fragment>
         <Header />
         <Routes>
            <Route path = "/login" element={<Login />}></Route>
         </Routes>
         <Footer />
    </React.Fragment>)
}