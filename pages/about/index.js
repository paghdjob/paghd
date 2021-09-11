import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";

function About(props) {
  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="row m-0 p-0">
          <h1>about you</h1>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

 

export default About;
