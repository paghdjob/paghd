import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Job(props) {
  const [jobList, setJobList] = useState(props.jobs);
  useEffect(() => {
    if (Object.keys(props).length === 0) {
      //     const router = useRouter()
      console.log(location.search);
      // if (Object.keys(jobList).length === 0) {
      fetch("https://www.paghd.com/v2/jobs/jobList.php" + location.search)
        .then((res) => res.json())
        .then(
          (result) => {
            setJobList(result.jobs);
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
      <HeaderNav />

      <div className="container">
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
                        <Link
                          className="text-dark"
                          href={"/job/" + data.jobSlug}
                        >
                          {data.jobTitle}
                        </Link>
                      </h6>
                      <p className="text-capitalize text-muted">
                        {data.comName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

// export staticParams = ['title', 'loc'];
export async function getServerSideProps(context) {
  // export async function getServerSideProps({ req, params }) {
  let list = {};
  // console.log(" params---", context.query);
  // if (cookies.get("myCat") !== "Pacman") {
  // if (context.req.headers["user-agent"].match("Chrome | Googlebot")) {
  const res = await fetch(
    "https://www.paghd.com/v2/jobs/jobList.php?title=" +
      context.query.title +
      "&loc=" +
      context.query.loc
  );
  list = await res.json();
  // }
  return { props: list };
}

export default Job;
