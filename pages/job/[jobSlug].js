import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import JobDetails from "../../components/jobs/jobDetails";

function JobDetail(props) {
  console.log(props.error);
  const [jobError, setJobError] = useState(props.error);
  const [jobObj, setJobObj] = useState(props);

  let jobdesc;
  if(jobObj.job && jobObj.job.jobDesc) {
    let desc = jobObj.job.jobDesc.replace(/(<([^>]+)>)/gi, "");
    jobdesc = desc.substring(0, 155);  
  }

  useEffect(() => {
    if (Object.keys(props).length === 0) {
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

export async function getServerSideProps({ req, params }) {
  // Fetch data from external API
  // const router = useRouter();
  let data = {};
  // if (req.headers["user-agent"].match("Chrome")) {
  if (params && params.jobSlug) {
    const res = await fetch("https://www.paghd.com/v2/jobs/about.php?jobSlug=" + params.jobSlug); 
    data = await res.json();
    if (data.job === null) { data.error = 200; }
  } else {
    data.error = 200;
  }  
  return { props: data };
}

export default JobDetail;
