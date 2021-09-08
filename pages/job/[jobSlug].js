import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";

import JobDetails from "../../components/jobs/jobDetails";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function JobDetail(props) {
  const [jobObj, setJobObj] = useState(props);
  const [description, setDescription] = useState("");

  let desc = jobObj.job.jobDesc.replace(/(<([^>]+)>)/gi, "");
  let jobdesc = desc.substring(0, 155);
  
  console.log("jobObj keyword---", jobObj);
  useEffect(() => {
    setDescription(jobdesc);
    // console.log("location---", props);
    if (Object.keys(props).length === 0) {
      console.log("location---", location.pathname.replace("/job/", ""));

      fetch(
        "https://www.paghd.com/v2/jobs/about.php?jobSlug=" +
          location.pathname.replace("/job/", "")
      )
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
        description={description}
        keywords={jobObj.job.comName}
      />
      <HeaderNav />
      {/* {jobObj && jobObj.job ? <h2>{jobObj.job.jobTitle}</h2> : ""} */}
      <div className="container">
        <JobDetails jobObj={jobObj} />
      </div>
      <FooterNav />
    </div>
  );
}

/* JobDetail.getInitialProps = async () => {
  const res = await fetch(
    "https://www.paghd.com/v2/jobs/about.php?jobSlug=solutions-architect"
  );
  const json = await res.json();
  console.log("json---", json)
  return { props: json };
}; */

export async function getServerSideProps({ req, params }) {
  // Fetch data from external API
  let data = {};
  const cookies = new Cookies();
  // if (req.headers["user-agent"].match("Chrome")) {
  const res = await fetch(
    "https://www.paghd.com/v2/jobs/about.php?jobSlug=" + params.jobSlug
  );
  data = await res.json();
  // }
  return { props: data };
}

export default JobDetail;
