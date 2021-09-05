import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeaderNav from "../../components/common/headerNav";
import JobDetails from "../../components/jobs/jobDetails";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function JobDetail(props) {
  const [jobObj, setJobObj] = useState(props);
 
  useEffect(() => {
    // console.log("location---", props);
    if (Object.keys(props).length === 0) {
        console.log("location---", location.pathname.replace("/job/", ""));

      fetch(
        "https://www.paghd.com/v2/jobs/about.php?jobSlug="+ location.pathname.replace("/job/", "")
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setJobObj(result);
            // console.log("job detail result--", result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Job detail</title>
        <meta name="description" content="Job detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderNav />
      <h1>Job detail </h1>
      {jobObj && jobObj.job ? <h2>{jobObj.job.jobTitle}</h2> : ""}
      <JobDetails jobObj={jobObj} />
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
  if (req.headers["user-agent"].match("Chrome")) {
    const res = await fetch(
      "https://www.paghd.com/v2/jobs/about.php?jobSlug=" + params.jobSlug
    );
    data = await res.json();
  }
  return { props: data };
}

export default JobDetail;
