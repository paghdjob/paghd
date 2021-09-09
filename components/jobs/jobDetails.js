import React, { useState, useEffect } from "react";

const JobDetails = (jobs) => {
  const [info, SetInfo] = useState(jobs.jobObj);

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
  let jobDate;
  if (info && info.job && info.job.jobDate != null) {
    jobDate = new Date(info.job.jobDate).toDateString("yyyy-MM-dd");
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
    jobSalary = info.job.jobSalaryStart + " " + info.job.jobSalaryCurrency + " to " + info.job.jobSalaryEnd + " " + info.job.jobSalaryCurrency + " " + SalaryType;
  }

  let jobHrView;
  if (info && info.jobAccess && info.jobAccess.length !== 0) {
    jobHrView = info.jobAccess.map((item) => {
      return (
        <span key={item.jobAccessID} className="mr-3 badge badge-secondary">
          <a className="text-white1" href={item.userID}>
            {item.userName}
          </a>
        </span>
      );
    });
  }
  // useEffect(() => {
  //   SetJob(jobs.jobObj.job);
  // }, [jobs]);

  return (
    <div className="text-left">
      <div className="card">
        <div className="card-header text-center">
          <h1>{info && info.job.jobTitle}</h1>
          <p className="card-text">{info && info.job.comName}</p>
        </div>
      </div>
      <div className="card-body">
        {info && info.job && info.job.jobYearStart && (
          <p className="card-text">
            <b>Experience :</b> {info && info.job && info.job.jobYearStart} to{" "}
            {info && info.job && info.job.jobYearEnd} Years{" "}
          </p>
        )}
        {cityView && (
          <p className="card-text">
            <b>City :</b> {cityView}
          </p>
        )}
        {jobSalary && (
          <p className="card-text">
            <b>Salary :</b> {jobSalary}{" "}
          </p>
        )}
        {info && info.job && info.job.jobPosition && (
          <p className="card-text">
            <b>Position :</b> {info && info.job && info.job.jobPosition}{" "}
            Position
          </p>
        )}
        {jobHrView && (
          <p className="card-text">
            <b>Post By :</b> {jobHrView}{" "}
          </p>
        )}
      </div>
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
            <b>Industry :</b> {indView}{" "}
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
        {jobDate && (
          <p className="card-text">
            <b>Job Post Date :</b> {jobDate}{" "}
          </p>
        )}
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
