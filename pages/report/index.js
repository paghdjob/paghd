import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const HeaderNav = dynamic(() => import('../../components/common/headerNav'))
const FooterNav = dynamic(() => import('../../components/common/footerNav'))
const ReportJobAccess = dynamic(() => import('../../components/report/reportJobAccess'))
const ReportJobApply = dynamic(() => import('../../components/report/reportJobApply'))
const ReportUserView = dynamic(() => import('../../components/report/reportUserView'))

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
