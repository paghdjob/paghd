import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { GetApi, PostApi } from "../../webApi";

const JobReportApply = (props) => {
  const [jobApplyUser, setJobApplyUser] = useState("");
  const [jobApplyStatusList, setJobApplyStatusList] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    if (!jobApplyUser) {
      (async () => {
      let body = { jobID: props.jobID };
      const res = await PostApi("/v2/jobs/aboutSet.php?type=FETCHAPPLYJOB", body)
      setJobApplyUser(result.jobApply);
      })()
    }
    if (!jobApplyStatusList) {
      (async () => {
      const res = await GetApi("/v2/auto.php?type=JOBAPPLYSTATUS")
      setJobApplyStatusList(res);
      })()
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
    PostApi("/v2/jobs/aboutSet.php?type=APPLYJOBUPDATE", body)
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
