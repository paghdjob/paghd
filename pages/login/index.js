import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import LoginPage from "../../components/auth/loginPage";
import ForgotPassword from "../../components/auth/forgotPassword";
import Registration from "../../components/auth/registration";
import ChangePassword from "../../components/auth/changePassword";

function Login(props) {
  const [page, setPage] = useState("LoginPage");
  const pageChange = (event) => {
    if (event && event.target && event.target.value) {
      setPage(event.target.value);
    }
  }

  return (
    <div>
      <HeadSeo
        title="Login | paghd.com"
        description="Register for free, post your resume online and apply for Sales, IT, marketing, software jobs in India  through Paghd.com. Submit your resume now and find the right job."
        keywords="job search, search jobs by company, search job site, job searches, executive job search, jobs search in world"
      />
      <HeaderNav />
      <div className="container mb-4">
       {page === "ChangePassword" && <ChangePassword />}
       {page === "Registration" && <Registration />}
       {page === "ForgotPassword" && <ForgotPassword />}
       {page === "LoginPage" && <LoginPage />}
        <ul className="nav justify-content-center">
          {page !== "Registration" && <button className="btn btn-link" value="Registration" onClick={pageChange}>Registration</button>}
          {page !== "ChangePassword" && <button className="btn btn-link" value="ChangePassword" onClick={pageChange}>Change Password</button>}
          {page !== "ForgotPassword" && <button className="btn btn-link" value="ForgotPassword" onClick={pageChange}>Forgot Password</button>}
          {page !== "LoginPage" && <button className="btn btn-link" value="LoginPage" onClick={pageChange}>Login</button>} 
        </ul>
      </div>
      <FooterNav />
    </div>
  );
}

export default Login;
