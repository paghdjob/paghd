import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const JobReportView = (props) => {
  const [jobView, setJobView] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    let body = { jobID: props.jobID };
    fetch("/v2/jobs/aboutSet.php?type=FETCHVIEWJOB", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setJobView(result.jobView);
        },
        (error) => {
          console.log("error--", error);
        }
      );
    }, []);


  let reportView = jobView && jobView.map((item) => {
        let jobViewDate = new Date(item.jobViewDate).toDateString("yyyy-MM-dd");
        return (
          <tr key={item.userID}>
            <td>{item.userID}</td>
            <td><a className="text-info" rel="noopener noreferrer" target="_blank" href={'/about/'+ item.userSlug}>{item.userName} </a></td>
            <td>{jobViewDate}</td>
          </tr>
        );
      }
      );

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
