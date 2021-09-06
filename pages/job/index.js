import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import React, { useState, useEffect } from "react";

const HeaderNav = dynamic(() => import("../../components/common/headerNav"));

function Job(props) {
  // const router = useRouter()
  // console.log("props", props);

  const [jobList, setJobList] = useState(props.jobs);

  useEffect(() => {
    if (Object.keys(props).length === 0) {
  //     const router = useRouter()
  console.log(location.search);
      // if (Object.keys(jobList).length === 0) {
      fetch("https://www.paghd.com/v2/jobs/jobList.php"+ location.search)
        .then((res) => res.json())
        .then(
          (result) => {
            setJobList(result.jobs);
            // console.log("job detail result--", result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, []);

  // console.log("jobList", jobList);

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
      <h1>
        Job list data
      </h1>
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
export async function getServerSideProps(context) {
  // export async function getServerSideProps({ req, params }) {
  let list = {};
  // console.log(" params---", context.query);
  // if (cookies.get("myCat") !== "Pacman") {
  if (context.req.headers["user-agent"].match("Chrome")) {
    const res = await fetch(
      "https://www.paghd.com/v2/jobs/jobList.php?title=" +
        context.query.title +
        "&loc=" +
        context.query.loc
    );
    list = await res.json();
  }
  return { props: list };
}

export default Job;
