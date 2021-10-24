import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
 
function Job(props) {
  return (
    <div>
      <HeaderNav />
      <div className="container">
         Job Search again
      </div>
      <FooterNav />
    </div>
  );
}

export default Job;