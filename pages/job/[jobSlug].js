import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeaderNav from "../../components/common/headerNav";
import JobDetails from "../../components/jobs/jobDetails";

function JobDetail(props) {
  // console.log("props---", props);
  const [jobObj, setJobObj] = useState(props);
  // console.log("jobObj---", jobObj);
  /* useEffect(() => {
    fetch("https://www.paghd.com/v2/jobs/about.php?jobSlug=solutions-architect")
      .then((res) => res.json())
      .then(
        (result) => {
          setJobObj(result);
          console.log("job detail result--", result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  }, []); */

  return (
    <div>
      <Head>
        <title>joblist</title>
        <meta name="description" content="job list" />
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

export async function getServerSideProps({params}) {
  // Fetch data from external API
  console.log(params)
  const res = await fetch(
    'https://www.paghd.com/v2/jobs/about.php?jobSlug='+params.jobSlug
  );
  const data = await res.json();
  return { props: data };
}

export default JobDetail;
