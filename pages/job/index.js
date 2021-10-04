import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import JobList from "../../components/jobs/jobList";
import JobFilter from "../../components/jobs/jobFilter";
import JobSearch from "../../components/jobs/jobSearch";
import { useRouter } from "next/router";

function Job(props) {
  const [jobList, setJobList] = useState(props.list.jobs);
  const [jobTotal, setJobTotal] = useState("");
  const [filt, setFilt] = useState("");
  const [pages, setPages] = useState(0);
  const router = useRouter();
  const [titleSearch, setTitleSearch] = useState(router.query.title);
  const [locSearch, setLocSearch] = useState(router.query.loc);

  useEffect(() => {
    if (!jobList) {
      handleData({ sorts: 0, page: 0 });
    }
    if (!filt) {
      filterJob()
    }
    if (props.list && props.list.total) { setJobTotal(props.list.total) };
    if (locSearch) {
      fetch("/v2/autopost/careerjet/careerjet.php?title="+titleSearch +"&loc="+locSearch)
      fetch("/v2/jobs/stackoverflowPostJob.php?q="+titleSearch+"&l="+locSearch +"&u=Km&d=100")
    }
  }, [props]);

  const filterJob = () => {
    fetch("/v2/jobs/filterJob.php?title=" + titleSearch + "&loc=" + locSearch)
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
  const handleData = (moredata) => {
    let newParam = "?title=" + titleSearch + "&loc=" + locSearch;
    if (moredata && (moredata.title || moredata.loc)) {
      newParam = "?title=" + moredata.title + "&loc=" + moredata.loc;
      setTitleSearch(moredata.title);
      setLocSearch(moredata.loc);
      filterJob();
    }
    fetch("/v2/jobs/jobList.php" + newParam, {
      method: "POST",
      body: JSON.stringify(moredata),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setJobTotal(result.total);
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
        title={`Jobs In ${locSearch} - Job Vacancies In ${locSearch} - paghd.com`}
        description={`Apply To 117134 Job Openings In ${locSearch}: 818 In Jpmorgan, 701 In Accenture, 525 In Ibm &amp; 511 In Hp On paghd.com. Explore Latest Jobs In ${locSearch} Across Top Companies Now!`}
        keywords={`job in ${locSearch}, Job Vacancies In ${locSearch}, ${locSearch}, ${titleSearch}`}
      />
      <HeaderNav />
      <div className="container">
        <JobSearch handlerFromParant={handleData} />
        <div className="row">
          <div className="d-none d-lg-block col-xs-3 col-md-3 left-panel pl-0">
            {filt && <JobFilter filt={filt} handlerFromParant={handleData} />}
          </div>
          <div className="col">
            <div className="float-start col-8">
              <h1 className="h5 pt-3">
                {jobTotal && jobTotal + " jobs"} {titleSearch && titleSearch + " in"}{" "}
                {locSearch}{" "}
              </h1>
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
  if (
    context.req.headers["user-agent"].match(
      "Chromes",
      "Googlebot",
      "Bingbot",
      "Slurp",
      "DuckDuckBot",
      "Baiduspider",
      "YandexBot",
      "Sogou",
      "facebot",
      "ia_archiver"
    )
  ) {
    // console.log("---context.req.headers--", context.req.headers["user-agent"]);
    const { loc, title } = context.query;
    let jobListReq = "https://www.paghd.com/v2/jobs/jobList.php";
    if (loc || title) {
      jobListReq = jobListReq + "?title=" + title + "&loc=" + loc;
    }
    const res = await fetch(jobListReq);
    list = await res.json();
    // const resFil = await fetch("https://www.paghd.com/v2/jobs/filterJob.php");
    // filterRes = await resFil.json();
  }
  return { props: { list, filterRes } };
}

export default Job;
