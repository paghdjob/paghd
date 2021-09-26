import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const JobReportApply = (props) => {
  const [jobApplyUser, setJobApplyUser] = useState("");
  const [jobApplyStatusList, setJobApplyStatusList] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    if (!jobApplyUser) {
      let body = { jobID: props.jobID };
      fetch("/v2/jobs/aboutSet.php?type=FETCHAPPLYJOB", {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setJobApplyUser(result.jobApply);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
    if (!jobApplyStatusList) {
      fetch("/v2/auto.php?type=JOBAPPLYSTATUS")
        .then((res) => res.json())
        .then(
          (result) => {
            setJobApplyStatusList(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, [props]);

  const jobStatusUpdate = (jobApplyID, userIds, event) => {
    const body = {
      jobApplyID: jobApplyID,
      jobApplyStatusID: event.target.value,
      changeStatus: userIds,
      jobID: props.jobID,
      userID: userID,
    };
    fetch("/v2/jobs/aboutSet.php?type=APPLYJOBUPDATE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result--", result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };
  let reportApply =
    jobApplyUser &&
    jobApplyUser.map((item) => {
      return (
        <tr key={item.jobApplyID}>
          <td>{item.userID}</td>
          <td>
            <a
              className="btn btn-outline-warning"
              rel="noopener noreferrer"
              target="_blank"
              href={"/about/" + item.userSlug}
            >
              {item.userName}
            </a>
          </td>
          <td>{item.userPrimaryNumber}</td>
          <td>{item.userPrimaryEmail}</td>
          <td>
            <select
              className="form-control col-10"
              defaultValue={item.jobApplyStatusID}
              onChange={jobStatusUpdate.bind(
                this,
                item.jobApplyID,
                item.userID
              )}
              name="jobApplyStatusID"
            >
              {jobApplyStatusList &&
                jobApplyStatusList.map((i) => (
                  <option key={i.jobApplyStatusID} value={i.jobApplyStatusID}>
                    {i.jobApplyText}
                  </option>
                ))}
            </select>
          </td>
        </tr>
      );
    });

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Job Apply Report</div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>User Number</th>
              <th>User Email ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{reportApply}</tbody>
        </table>
      </div>
    </div>
  );
};

export default JobReportApply;
