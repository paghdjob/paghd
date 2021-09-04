import React, { useState, useEffect } from "react";

const JobDetails = (jobs) => {
  // console.log("jobs inner components - JobDetails", jobs.jobObj);
  const [job, SetJob] = useState(jobs.jobObj.job);
  useEffect(() => {
    SetJob(jobs.jobObj.job);
  }, [jobs]);

  return (
    <div className="text-left pt-5 pb-5 mt-5 mb-5">
      <div className="card-body">
        <h1 className="text-center">{job && job.jobTitle}</h1>
        <div dangerouslySetInnerHTML={{__html: job && job.jobDesc}} />
      </div>
    </div>
  );
};
export default JobDetails;
