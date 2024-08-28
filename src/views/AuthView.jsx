import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Login } from "../components/login";
import { Signup } from "../components/signup";
import { ForgotPW } from "../components/forgot-password";
import { ResetPW } from "../components/reset-password";
import { OtpVerify } from "../components/otp";
import { Registration } from "../components/registration";
import { Verifymessege } from "../components/verifymessege";
import { Home } from "../components/home";
import Course from "../components/course";
import {CourseCategory} from "../components/coursecategory";
import { Verifyotp } from "../components/verifyotp";

export const AuthView = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        {/* If user is authenticated, allow access only to Registration page */}
        <Route path="/registration" element={<Registration />} />
        // If not authenticated, allow access to login, signup, forgot, reset,
        otp routes
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/verifymessege" element={<Verifymessege />}></Route>
          <Route path="/verifyotp" element={<Verifyotp />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPW />} />
          <Route path="/reset" element={<ResetPW />} />
          <Route path="/otp" element={<OtpVerify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/coursecategory" element={<CourseCategory />} />
          {/* Redirect to login page if user tries to access any other route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      </Routes>
      <Footer />
    </React.Fragment>
  );
};
