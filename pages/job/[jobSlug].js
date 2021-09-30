import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import JobDetails from "../../components/jobs/jobDetails";

function JobDetail(props) {
  const [jobError, setJobError] = useState(props.error);
  const [jobObj, setJobObj] = useState(props);

  let jobdesc;
  if(jobObj.job && jobObj.job.jobDesc) {
    let desc = jobObj.job.jobDesc.replace(/(<([^>]+)>)/gi, "");
    jobdesc = desc.substring(0, 155);  
  }

  useEffect(() => {
    if (!jobObj) {
      fetch("/v2/jobs/about.php?jobSlug=" + location.pathname.replace("/job/", ""))
        .then((res) => res.json())
        .then(
          (result) => {
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
      {!jobError &&
      <HeadSeo
        title={jobObj.job.jobTitle}
        description={jobdesc}
        keywords={jobObj.job.comName}
      /> }
      <HeaderNav />
      {jobError ? 'No record found' : <div className="container">
        <JobDetails jobObj={jobObj} />
      </div>}
      <FooterNav />
    </div>
  );
}

export async function getServerSideProps(context) {

  let data = {};
  const { jobSlug } = context.query;
  // if (req.headers["user-agent"].match("Chrome")) {
    const res = await fetch("https://www.paghd.com/v2/jobs/about.php?jobSlug="+jobSlug); 
    data = await res.json();
    if (data.job === null) { data.error = 200; }
  return { props: data };
}

export default JobDetail;
