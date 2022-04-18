import React from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import LogoutPage from "../../components/auth/logoutPage";

function Login() {
  return (
    <div>
      <HeadSeo
        title="Log Out - paghd.com"
        description="Apply To 117134 Job Openings In Bangalore: 818 In Jpmorgan, 701 In Accenture, 525 In Ibm &amp; 511 In Hp On paghd.com. Explore Latest Jobs In Bangalore Across Top Companies Now!"
        keywords="Log out, paghd.com"
      />
      <HeaderNav />
      <div className="container">
        <LogoutPage />
      </div>
      <FooterNav />
    </div>
  );
}

export default Login;
