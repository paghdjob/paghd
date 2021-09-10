import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import JobList from "../../components/jobs/jobList";
import JobFilter from "../../components/jobs/jobFilter";

function Job(props) {
  // console.log("job list props.list ---", props.list.jobs);
  const [jobList, setJobList] = useState(props.list.jobs);
  const [filt, setFilt] = useState(props.filterRes);
  // const [mounted, setMounted] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (Object.keys(props).length === 0) {
      // if (Object.keys(jobList).length === 0) {
      fetch("https://www.paghd.com/v2/jobs/jobList.php" + location.search)
        .then((res) => res.json())
        .then(
          (result) => {
            // const datas = jobList.concat(result.jobs);
            setJobList(result.jobs);
            // setPage(0)
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, [props]);

  // const toggle = () => setMounted(!mounted);

  const handleData = (event) => {
    // toggle()
    fetch("https://www.paghd.com/v2/jobs/jobList.php", {
      method: "POST",
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (event.page === 0) {
            setJobList(result.jobs);
          } else {
            const data = jobList.concat(result.jobs);
            setJobList(data);
          }
          setPage(event.page)
          // setMounted(event.page);
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
            <JobFilter filt={filt} handlerFromParant={handleData} />
          </div>
          <div className="col mt-md-2 m-0 p-0">
            <JobList pages={page} list={jobList} handlerFromParant={handleData} />
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
    const res = await fetch("https://www.paghd.com/v2/jobs/jobList.php?title=" + context.query.title + "&loc=" + context.query.loc);
    list = await res.json();
    const resFil = await fetch("https://www.paghd.com/v2/jobs/filterJob.php");
    filterRes = await resFil.json();
    
  // }
  return { props: { list, filterRes } };
}

export default Job;
