import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import JobDetails from "../../components/jobs/jobDetails";

function JobDetail(props) {
  const [jobObj, setJobObj] = useState(props);

  let jobdesc;
  if(jobObj.job && jobObj.job.jobDesc) {
    let desc = jobObj.job.jobDesc.replace(/(<([^>]+)>)/gi, "");
    jobdesc = desc.substring(0, 155);  
  }

  
  useEffect(() => {
    if (Object.keys(props).length === 0) {
      fetch("https://www.paghd.com/v2/jobs/about.php?jobSlug=" + location.pathname.replace("/job/", ""))
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
      <HeadSeo
        title={jobObj.job.jobTitle}
        description={jobdesc}
        keywords={jobObj.job.comName}
      />
      <HeaderNav />
      <div className="container">
        <JobDetails jobObj={jobObj} />
      </div>
      <FooterNav />
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  // Fetch data from external API
  let data = {};
  // if (req.headers["user-agent"].match("Chrome")) {
  const res = await fetch("https://www.paghd.com/v2/jobs/about.php?jobSlug=" + params.jobSlug);
  data = await res.json();
  // }
  return { props: data };
}

export default JobDetail;
