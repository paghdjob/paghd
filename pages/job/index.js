import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import HeaderNav from "../../components/common/headerNav";

function Job(props) {
  // const router = useRouter()
  console.log("props", props);

  const [jobList, setJobList] = useState(props.jobs);

  console.log("jobList", jobList);

  return (
    <div>
      <div>
        <HeaderNav />
      </div>
      <Head>
        <title>joblist</title>
        <meta name="description" content="job list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Job list data</h1>
      <div className="row">
        {jobList &&
          jobList.map((data) => (
            <div
              className="pl-0 pb-2 col-md-6 col-lg-6 col-xl-4"
              key={data.jobID}
            >
              <div className="card">
                <div className="pb-0 card-body">
                  <div className="float-left mr-3">
                    <i
                      className="fa fa-briefcase icon32 disabled"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="text-left">
                    <h6 className="card-title text-capitalize mb-1">
                      <Link className="text-dark" href={"/job/" + data.jobSlug}>
                        {data.jobTitle}
                      </Link>
                       
                    </h6>
                    <p className="text-capitalize text-muted">{data.comName}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// export staticParams = ['title', 'loc'];

export async function getServerSideProps(req) {
  // console.log("====req====---")
  // console.log("req", req.query.title)
  // // Fetch data from external API
  const res = await fetch(
    "https://www.paghd.com/v2/jobs/jobList.php?title=" +
      req.query.title +
      "&loc=" +
      req.query.loc
  );
  const list = await res.json();
  return { props: list };
}

export default Job;
