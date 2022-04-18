import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../../components/common/headerNav";
import FooterNav from "../../../components/common/footerNav";
import JobProfile from "../../../components/jobs/about/jobProfile";
import JobWorkType from "../../../components/jobs/about/jobWorkType";
import JobIndustry from "../../../components/jobs/about/jobIndustry";
import JobSkill from "../../../components/jobs/about/jobSkill";
import JobLanguage from "../../../components/jobs/about/jobLanguage";
import JobAccess from "../../../components/jobs/about/jobAccess";
import JobReportView from "../../../components/jobs/about/jobReportView";
import JobReportApply from "../../../components/jobs/about/jobReportApply";
import JobCity from "../../../components/jobs/about/jobCity";
import Cookies from "universal-cookie";
import { GetApi } from "../../../components/webApi";

function JobAbout(props) {
  const [jobObj, setJobObj] = useState("");
  const [noAccess, setNoAccess] = useState(false);
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect( () => {
    if (!jobObj) {
      (async () => {
      const res = await GetApi(
        `/v2/jobs/about.php?jobSlug=${location.pathname.replace(
          "/job/about/",
          ""
        )}`
      );
      const access = res.jobAccess.find((u) => u.userID === userID);
      if (access && access.userID === userID) {
        setJobObj(res);
      } else {
        setNoAccess(true);
      }
    })()
    }
  }, [props]);
  // let a = jobObj && jobObj.jobAccess.find(u => u.userID === userIds);
  return (
    <div>
      <HeaderNav />
      <div className="container">
        {jobObj && (
          <>
            <div className="row">
              <h1>Edit Job : {jobObj.job.jobTitle} </h1>
              <div className="float-end">
                <Link href={"/job/" + jobObj.job.jobSlug}>
                  <a className="float-end btn btn-info">Preview Job</a>
                </Link>
              </div>
            </div>
            <JobProfile jobObj={jobObj.job} />
            <JobSkill skill={jobObj.jobSkill} jobID={jobObj.job.jobID} />
            <JobCity city={jobObj.jobCity} jobID={jobObj.job.jobID} />
            <JobIndustry
              industry={jobObj.jobIndustry}
              jobID={jobObj.job.jobID}
            />
            <JobWorkType
              workType={jobObj.jobWorkType}
              jobID={jobObj.job.jobID}
            />
            <JobLanguage
              languages={jobObj.jobLanguage}
              jobID={jobObj.job.jobID}
            />
            <JobAccess jobAccess={jobObj.jobAccess} jobID={jobObj.job.jobID} />
            <JobReportApply jobID={jobObj.job.jobID} />
            <JobReportView jobID={jobObj.job.jobID} />
          </>
        )}
        {noAccess && <h2>No Access</h2>}
      </div>
      <FooterNav />
    </div>
  );
}

export default JobAbout;
