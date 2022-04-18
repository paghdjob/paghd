import React, { useState, useEffect } from "react";
import { PostApi } from "../../webApi";

const JobReportView = (props) => {
  const [jobView, setJobView] = useState("");

  useEffect(() => {
    (async () => {
    let body = { jobID: props.jobID };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=FETCHVIEWJOB", body)
    setJobView(res.jobView);
    })()
  }, [props]);

  let reportView =
    jobView &&
    jobView.map((item) => {
      let jobViewDate = new Date(item.jobViewDate).toDateString("yyyy-MM-dd");
      return (
        <tr key={item.userID}>
          <td>{item.userID}</td>
          <td>
            <a
              className="text-info"
              rel="noopener noreferrer"
              target="_blank"
              href={"/about/" + item.userSlug}
            >
              {item.userName}
            </a>
          </td>
          <td>{jobViewDate}</td>
        </tr>
      );
    });

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">User Job View Report</div>
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{reportView}</tbody>
        </table>
      </div>
    </div>
  );
};

export default JobReportView;
