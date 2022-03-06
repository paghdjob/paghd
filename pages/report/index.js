import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import dynamic from 'next/dynamic'
const HeaderNav = dynamic(() => import('../../components/common/headerNav'))
const FooterNav = dynamic(() => import('../../components/common/footerNav'))
const ReportJobAccess = dynamic(() => import('../../components/report/reportJobAccess'))
const ReportJobApply = dynamic(() => import('../../components/report/reportJobApply'))
const ReportUserView = dynamic(() => import('../../components/report/reportUserView'))
=======
import dynamic from "next/dynamic";
const HeaderNav = dynamic(() => import("../../components/common/headerNav"));
const FooterNav = dynamic(() => import("../../components/common/footerNav"));
const ReportJobAccess = dynamic(() =>
  import("../../components/report/reportJobAccess")
);
const ReportJobApply = dynamic(() =>
  import("../../components/report/reportJobApply")
);
const ReportUserView = dynamic(() =>
  import("../../components/report/reportUserView")
);
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879

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
