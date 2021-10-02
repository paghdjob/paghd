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
  const [jobTotal, setJobTotal] = useState(props.list.total);
  const [filt, setFilt] = useState("");
  const [pages, setPages] = useState(0);
  const [searchJob, setSearchJob] = useState("");
  const router = useRouter();
  const { loc, title } = router.query;
  
  useEffect(() => {
if(loc) {
    fetch("/v2/autopost/careerjet/careerjet.php?title="+title+"&loc="+loc)
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

   fetch("/v2/jobs/stackoverflowPostJob.php?q="+title+"&l="+loc+"&u=Km&d=100")
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
      fetch("/v2/jobs/filterJob.php?title="+title+"&loc="+loc)
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
    if (jobList.length === 0) {
      fetch("/v2/jobs/jobList.php?title="+title+"&loc="+loc)
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
    fetch("/v2/jobs/jobList.php?title="+title+"&loc="+loc, {
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
        title={`Jobs In ${loc} - Job Vacancies In ${loc} - paghd.com`}
        description={`Apply To 117134 Job Openings In ${loc}: 818 In Jpmorgan, 701 In Accenture, 525 In Ibm &amp; 511 In Hp On paghd.com. Explore Latest Jobs In ${loc} Across Top Companies Now!`}
        keywords={`job in ${loc}, Job Vacancies In ${loc}, ${loc}, ${title}`}
      />
      <HeaderNav />
      <div className="container">
        <div className="row">
          <div className="d-none d-lg-block col-xs-3 col-md-3 left-panel pl-0">
            {filt && <JobFilter filt={filt} handlerFromParant={handleData} />}
          </div>
          <div className="col">
            <div className="float-start col-8">
              <h1 className="h5 pt-3">{jobTotal} jobs {title && title+ ' in'}  {loc} </h1>
            </div>
            {jobList && (
              <JobList
                pages={pages}
                list={jobList}                
                handlerFromParant={handleData}
                isFeature={true}
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
  const { loc, title } = context.query;
  let jobListReq = 'https://www.paghd.com/v2/jobs/jobList.php';
  if (loc || title) {
    jobListReq = jobListReq + '?title='+title+'&loc='+loc;
  }
  // if (context.req.headers["user-agent"].match("Chrome")) {
  const res = await fetch(jobListReq);
  list = await res.json();
  // const resFil = await fetch("https://www.paghd.com/v2/jobs/filterJob.php");
  // filterRes = await resFil.json();
  // }
  return { props: { list, filterRes } };
}

export default Job;
