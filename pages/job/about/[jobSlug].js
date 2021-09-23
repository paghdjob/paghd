import dynamic from "next/dynamic";
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
 
function JobAbout(props) {
  const [jobObj, setJobObj] = useState("");

  useEffect(() => {
    if (!jobObj) {
      fetch("/v2/jobs/about.php?jobSlug=" + location.pathname.replace("/job/about/", ""))
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("result----", result);
            setJobObj(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, []);

  return (
    <div>
      <HeaderNav />
      <div className="container">
        <h1>Edit your job </h1>
        {jobObj && 
        <>
          <JobProfile jobObj={jobObj.job} />
          <JobSkill skill={jobObj.jobSkill} jobID={jobObj.job.jobID} />
          <JobIndustry industry={jobObj.jobIndustry} jobID={jobObj.job.jobID} />
          <JobWorkType workType={jobObj.jobWorkType} jobID={jobObj.job.jobID} />
          <JobLanguage languages={jobObj.jobLanguage} jobID={jobObj.job.jobID} />
          <JobAccess jobAccess={jobObj.jobAccess} jobID={jobObj.job.jobID} />
          <JobReportApply jobID={jobObj.job.jobID} />
          <JobReportView jobID={jobObj.job.jobID} />
        </>
        }
        {/* <JobCity city={info && info.jobCity} jobID={info && info.job.jobID} userID={b} /> */}
      </div>
      <FooterNav />
    </div>
  );
}

export default JobAbout;
