import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import HeadSeo from "../../components/headSeo";
import JobDetails from "../../components/jobs/jobDetails";
import JobList from "../../components/jobs/jobList";
import FooterNav from "../../components/common/footerNav";

function JobDetail(props) {
  const [jobError, setJobError] = useState(props.error);
  const [jobObj, setJobObj] = useState(props);
  const [jobList, setJobList] = useState("");

  let jobdesc;
  if (jobObj.job && jobObj.job.jobDesc) {
    let desc = jobObj.job.jobDesc.replace(/(<([^>]+)>)/gi, "");
    jobdesc = desc.substring(0, 155);
  }

  useEffect(() => {
    // if (!jobObj) {
    fetch(
      "/v2/jobs/about.php?jobSlug=" + location.pathname.replace("/job/", "")
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
    //  }
    if (jobList.length === 0 && jobObj && jobObj.job) {
      fetch("/v2/jobs/jobListNew.php?title="+ jobObj.job.jobTitle)
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

  return (
    <div>
      {!jobError && jobObj.job && (
        <HeadSeo
          title={jobObj.job.jobTitle}
          description={jobdesc}
          keywords={jobObj.job.comName}
          structuredData={{
            "@context" : "https://schema.org/",
            "@type" : "JobPosting",
            "title" : jobObj.job.jobTitle,
            "description" : jobObj.job.jobDesc,
            "identifier": {
              "@type": "PropertyValue",
              "name": jobObj.job.comName,
              "value": jobObj.job.jobID
            },
            "datePosted" : jobObj.job.jobDate,
            "validThrough" : "",
            "employmentType" : jobObj.jobWorkType ? jobObj.jobWorkType[0].workTypeName : '',
            "hiringOrganization" : {
              "@type" : "Organization",
              "name" : jobObj.job.comName,
              "sameAs" : "https://paghd.vercel.app/"+ jobObj.job.jobSlug,
              "logo" : "https://paghd.vercel.app/icons/icon-32x32.png"
            },
            "jobLocation": {
            "@type": "Place",
              "address": {
              "@type": "PostalAddress",
              "streetAddress": jobObj.jobCity ? jobObj.jobCity[0].cityName : '',
              "addressLocality": jobObj.jobCity ? jobObj.jobCity[0].cityName : '',
              "addressRegion": jobObj.jobCity ? jobObj.jobCity[0].cityName : '',
              "postalCode": "",
              "addressCountry": jobObj.jobCity ? jobObj.jobCity[0].countryCode : ''
              }
            },
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": jobObj.job.jobSalaryCurrency,
              "value": {
                "@type": "QuantitativeValue",
                "minValue": jobObj.job.jobSalaryStart,
                "maxValue": jobObj.job.jobSalaryEnd,
                "unitText": "HOUR"
              }
            }
          }}
        />
      )}
      <HeaderNav />
      {jobError ? (
        "No record found"
      ) : (
        <div className="container">
          {jobObj.job && <JobDetails jobObj={jobObj} />}
        </div>
      )}
      {jobList && (
        <div className="container">
          <JobList pages={0} list={jobList} isFeature={false} />
        </div>
      )}
      <FooterNav />
    </div>
  );
}

export async function getServerSideProps(context) {
  let data = {};
  if (
    context.req.headers["user-agent"].match(
      "Chrome",
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
    const { jobSlug } = context.query;
    const res = await fetch("https://www.paghd.com/v2/jobs/about.php?jobSlug=" + jobSlug);
    data = await res.json();
    if (data.job === null) {
      data.error = 200;
    }
  }
  return { props: data };
}

export default JobDetail;
