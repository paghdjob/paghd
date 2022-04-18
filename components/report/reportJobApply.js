import React, { useState, useEffect } from "react";
import { GetApi } from "../webApi";
const ReportJobApply = (props) => {
  const [jobApply, setJobApply] = useState("");

  useEffect(() => {
    (async () => {
      const res = await GetApi(`/v2/people/reportSet.php?type=JOBAPPLY`)
      setJobApply(res.jobStatus)
    })()
  }, [props]);
  let userView;
  if (jobApply) {
    userView = jobApply.map((item) => {
      return (
        <tr key={item.jobApplyID}>
          <td>
            <a
              className="text-info"
              rel="noopener noreferrer"
              target="_blank"
              href={"job/" + item.jobSlug}
            >
              {item.jobTitle}
            </a>
          </td>
          <td className="text">{item.jobApplyText}</td>
          <td>
            {new Date(
              item.jobApplyDate.replace(/-/g, "/")
            ).toLocaleDateString()}
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="rows">
      <div className="card table-responsive mb-1">
        <div className="card-header">Job Apply Report</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{userView}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportJobApply;
