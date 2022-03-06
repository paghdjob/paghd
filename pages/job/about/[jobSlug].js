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
<<<<<<< HEAD
import JobCity from '../../../components/jobs/about/jobCity';
=======
import JobCity from "../../../components/jobs/about/jobCity";
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
import Cookies from "universal-cookie";

function JobAbout(props) {
  const [jobObj, setJobObj] = useState("");
  const [noAccess, setNoAccess] = useState(false);
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    if (!jobObj) {
<<<<<<< HEAD
      fetch("/v2/jobs/about.php?jobSlug=" + location.pathname.replace("/job/about/", ""))
        .then((res) => res.json())
        .then(
          (result) => {
            const access = result.jobAccess.find(u => u.userID === userID);
            if(access && access.userID === userID) {
=======
      fetch(
        "/v2/jobs/about.php?jobSlug=" +
          location.pathname.replace("/job/about/", "")
      )
        .then((res) => res.json())
        .then(
          (result) => {
            const access = result.jobAccess.find((u) => u.userID === userID);
            if (access && access.userID === userID) {
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
              setJobObj(result);
            } else {
              setNoAccess(true);
            }
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
<<<<<<< HEAD
  }, []);
// let a = jobObj && jobObj.jobAccess.find(u => u.userID === userIds);
=======
  }, [props]);
  // let a = jobObj && jobObj.jobAccess.find(u => u.userID === userIds);
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
  return (
    <div>
      <HeaderNav />
      <div className="container">
<<<<<<< HEAD
        {jobObj && 
        <>
        <div className="row">
          <h1>Edit Job : {jobObj.job.jobTitle} </h1>
          <div className="float-end">
          <Link href={'/job/'+ jobObj.job.jobSlug}>
            <a className="float-end btn btn-primary">Preview this job</a>
          </Link>
          </div>
        </div>
          <JobProfile jobObj={jobObj.job} />
          <JobSkill skill={jobObj.jobSkill} jobID={jobObj.job.jobID} />
          <JobCity city={jobObj.jobCity} jobID={jobObj.job.jobID} />
          <JobIndustry industry={jobObj.jobIndustry} jobID={jobObj.job.jobID} />
          <JobWorkType workType={jobObj.jobWorkType} jobID={jobObj.job.jobID} />
          <JobLanguage languages={jobObj.jobLanguage} jobID={jobObj.job.jobID} />
          <JobAccess jobAccess={jobObj.jobAccess} jobID={jobObj.job.jobID} />
          <JobReportApply jobID={jobObj.job.jobID} />
          <JobReportView jobID={jobObj.job.jobID} />
        </>
        }
=======
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
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
        {noAccess && <h2>No Access</h2>}
      </div>
      <FooterNav />
    </div>
  );
}

export default JobAbout;
