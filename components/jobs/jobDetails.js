import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import ProfileResume from '../about/profile/peopleResume';

const JobDetails = (props) => {
  const [info, setInfo] = useState(props.jobObj);
  const [jobApplyText, setJobApplyText] = useState("");
  const [isProfileResume, setIsProfileResume] = useState(false);
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      let body = { jobID: info.job.jobID };
      fetch("/v2/jobs/aboutSet.php?type=VIEWJOB", {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(body),
      });
    }
    setInfo(props.jobObj);
  }, [props]);

  let skillView, indView, langView, workView, cityView;
  if (info && info.jobSkill && info.jobSkill.length !== 0) {
    skillView = info.jobSkill.map((item) => {
      return <span key={item.skiID}>{item.skillName}, </span>;
    });
  }
  if (info && info.jobIndustry && info.jobIndustry.length !== 0) {
    indView = info.jobIndustry.map((item) => {
      return <span key={item.IndID}>{item.IndName}, </span>;
    });
  }
  if (info && info.jobLanguage && info.jobLanguage.length !== 0) {
    langView = info.jobLanguage.map((item) => {
      return <span key={item.jobLangID}>{item.langName}, </span>;
    });
  }
  if (info && info.jobWorkType && info.jobWorkType.length !== 0) {
    workView = info.jobWorkType.map((item) => {
      return <span key={item.workTypeID}>{item.workTypeName}, </span>;
    });
  }
  if (info && info.jobCity && info.jobCity.length !== 0) {
    cityView = info.jobCity.map((item) => {
      return (
        <span key={item.jobCityID}>
          {item.cityName}, {item.countryName}
        </span>
      );
    });
  }
  let SalaryType;
  if (info && info.job && info.job.jobSalaryType === "1") {
    SalaryType = "Per Year";
  } else if (info && info.job && info.job.jobSalaryType === "2") {
    SalaryType = "Per Month";
  } else if (info && info.job && info.job.jobSalaryType === "3") {
    SalaryType = "Per Day";
  } else if (info && info.job && info.job.jobSalaryType === "4") {
    SalaryType = "Per Hour";
  } else if (info && info.job && info.job.jobSalaryType === "5") {
    SalaryType = "Fixed";
  } else {
    SalaryType = "As per industry standards";
  }
  let jobSalary = null;
  if (info && info.job && info.job.jobSalaryStart && info.job.jobSalaryEnd) {
    jobSalary =
      info.job.jobSalaryStart +
      " " +
      info.job.jobSalaryCurrency +
      " to " +
      info.job.jobSalaryEnd +
      " " +
      info.job.jobSalaryCurrency +
      " " +
      SalaryType;
  }

  let jobHrView;
  if (info && info.jobAccess && info.jobAccess.length !== 0) {
    jobHrView = info.jobAccess.map((item) => {
      return (
        <span key={item.jobAccessID} className="mr-3 badge badge-secondary">
          <a className="text-white1" href={"/about/" + item.userSlug}>
            {item.userName}
          </a>
        </span>
      );
    });
  }

  const onApply = () => {
    if (userID) {
      let body = { jobID: info.job.jobID };
      fetch("/v2/jobs/aboutSet.php?type=APPLYJOB", {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setJobApplyText(result.jobApplyText);
            if (result.valid === "false") {
              setIsProfileResume(true);
            } else if (result.valid === "true" && userID && info.job.jobRefURL) {
              window.open(info.job.jobRefURL, "_blank");
            }
          },
          (error) => {
            console.log("error--", error);
          }
        );
    } else {
      router.push("/login?url=" + router.asPath);
    }
  };
  let resume = isProfileResume ?  <ProfileResume /> : '';
  return (
    <div className="text-left">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h1 className="h4">{info && info.job.jobTitle}</h1>
              <p className="card-text">{info && info.job.comName}</p>
              {info && info.job && info.job.jobYearStart && (
                <p className="card-text">
                  <b>Experience : </b>
                  {info && info.job && info.job.jobYearStart} to {info && info.job && info.job.jobYearEnd} Years
                </p>
              )}
              {cityView && (
                <p className="card-text">
                  <b>City : </b> {cityView}
                </p>
              )}
              {jobSalary && (
                <p className="card-text">
                  <b>Salary : </b> {jobSalary}
                </p>
              )}
              {info && info.job && info.job.jobPosition && (
                <p className="card-text">
                  <b>Position : </b> {info && info.job && info.job.jobPosition} Position
                </p>
              )}
              {jobHrView && (
                <p className="card-text">
                  <b>Post By : </b> {jobHrView}
                </p>
              )}
            </div>
            <div className="col-4">
              <button
                type="submit"
                className="btn btn-info ml-1 float-end"
                onClick={onApply}
              >
                Job Apply
              </button>
              <p className="card-text float-end">{jobApplyText}</p>
            </div>
          </div>
        </div>
      </div>
      {resume}
      {info && info.job && (
        <div className="card-body">
          <p className="card-text">Job Description</p>
          <div dangerouslySetInnerHTML={{ __html: info.job.jobDesc }} />
        </div>
      )}

      <div className="card-body">
        {skillView && (
          <p className="card-text">
            <b>Skill :</b> {skillView}
          </p>
        )}
        {indView && (
          <p className="card-text">
            <b>Industry :</b> {indView}
          </p>
        )}
        {langView && (
          <p className="card-text">
            <b>Language :</b> {langView}
          </p>
        )}
        {workView && (
          <p className="card-text">
            <b>Work Type :</b> {workView}
          </p>
        )}
        {info.job.jobDate && (
          <p className="card-text">
            <b>Job Post Date :</b> {new Date(info.job.jobDate.replace(/-/g, '/')).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="rows">
        <ul className="nav">
          {info && info.allCity  &&
            info.allCity.map((city) => {
              return (
                <li className="float-start m-2" key={city.cityID}>
                  <Link href={'/jobs/jobs-in-' + (city.cityName).replace(' ','-')}>
                  <a className="p-1">
                       {'Job In '+city.cityName}
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="card-body">
        <h3>Safety Tips</h3>
        <ul>
          <li>
            Paghd.com does not promise a Job or an interview in exchange of
            money
          </li>
          <li>Research the job and the company before you apply</li>
          <li>Beware of Career Consulting scams and Recruiting scams</li>
          <li>There are no shortcuts to success in career</li>
        </ul>
      </div>
    </div>
  );
};
export default JobDetails;
