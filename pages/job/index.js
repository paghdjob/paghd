import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import JobList from "../../components/jobs/jobList";
import JobFilter from "../../components/jobs/jobFilter";
import { useRouter } from 'next/router';

function Job(props) {
  // console.log("job list props.list ---", props.list.jobs);
  const [jobList, setJobList] = useState(props.list.jobs);
  const [filt, setFilt] = useState("");
  const [pages, setPages] = useState(0);
  const [searchJob, setSearchJob] = useState("");
  const router = useRouter();

  useEffect(() => {

    console.log("location router---", router);
if(router.query && router.query.loc) {
    fetch("/v2/autopost/careerjet/careerjet.php?title="+ router.query.title +"&loc="+ router.query.loc)
    .then((res) => res.json())
    .then(
      (result) => {
       console.log("result--", result);
      },
      (error) => {
        console.log("error--", error);
      }
    );
  }

   fetch("/v2/jobs/stackoverflowPostJob.php?q="+ router.query.title +"&l="+ router.query.loc +"&u=Km&d=100")
   .then((res) => res.json())
   .then(
     (result) => {
      console.log("result--", result);
     },
     (error) => {
       console.log("error--", error);
     }
   );

    if (!filt) {
      fetch("/v2/jobs/filterJob.php" + location.search)
        .then((res) => res.json())
        .then(
          (result) => {
            setFilt(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
    if (!jobList) {
      fetch("/v2/jobs/jobList.php" + location.search)
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
  }, [props]);

  const handleData = (moredata) => {
    fetch("/v2/jobs/jobList.php" + location.search, {
      method: "POST",
      body: JSON.stringify(moredata),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("data--->", moredata.page);
          setPages(moredata.page);
          if (moredata.page === 0) {
            setJobList(result.jobs);
          } else {
            const data = jobList.concat(result.jobs);
            setJobList(data);
          }          
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  return (
    <div>
      <HeadSeo
        title="Jobs In Bangalore - Job Vacancies In Bangalore - paghd.com"
        description="Apply To 117134 Job Openings In Bangalore: 818 In Jpmorgan, 701 In Accenture, 525 In Ibm &amp; 511 In Hp On paghd.com. Explore Latest Jobs In Bangalore Across Top Companies Now!"
        keywords="job in bangalore"
      />
      <HeaderNav />
      <div className="container">
        <div className="row m-0 p-0">
          <div className="d-none d-lg-block col-xs-3 col-md-3 left-panel pl-0">
            {filt && <JobFilter filt={filt} handlerFromParant={handleData} />}
          </div>
          <div className="col mt-md-2 m-0 p-0">
            {jobList && (
              <JobList
                pages={pages}
                list={jobList}
                handlerFromParant={handleData}
              />
            )}
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export async function getServerSideProps(context) {
  let list = {};
  let filterRes = {};
  // if (context.req.headers["user-agent"].match("Chrome")) {
  const res = await fetch(
    "https://www.paghd.com/v2/jobs/jobList.php?title=" +
      context.query.title +
      "&loc=" +
      context.query.loc
  );
  list = await res.json();
  // const resFil = await fetch("https://www.paghd.com/v2/jobs/filterJob.php");
  // filterRes = await resFil.json();

  // }
  return { props: { list, filterRes } };
}

export default Job;
