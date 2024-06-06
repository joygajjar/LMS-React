import {Route, Routes, } from 'react-router-dom'
import React from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Login } from '../components/login';
import { Signup } from '../components/signup';
import { ForgotPW } from '../components/forgot-password';
import { ResetPW } from '../components/reset-password';
import { OtpVerify } from '../components/otp';
import { Registration } from '../components/registration';

export const AuthView = () => {
    return (
    <React.Fragment>
         <Header/>
         <Routes>
            <Route path = "/login" element={<Login />}></Route>
            <Route path = "/signup" element={<Signup />}></Route>
            <Route path = "/forgot" element={<ForgotPW />}></Route>
            <Route path = "/reset" element={<ResetPW />}></Route>
            <Route path = "/otp" element={<OtpVerify />}></Route>
            <Route path = "/registration" element={<Registration />}></Route>
         </Routes>
         <Footer/>
    </React.Fragment>
    )
}