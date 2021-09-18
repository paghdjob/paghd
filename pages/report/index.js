import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import ReportJobAccess from "../../components/report/reportJobAccess";
import ReportJobApply from "../../components/report/reportJobApply";
import ReportUserView from "../../components/report/reportUserView";
 
function Report(props) {
  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="row m-0 p-0">
          <h1>Report</h1>
        </div>
        <ReportJobAccess />
        <ReportJobApply />
        <ReportUserView />
      </div>
      <FooterNav />
    </div>
  );
}

export default Report;
