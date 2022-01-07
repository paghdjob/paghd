import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ReportJobApply = (props) => {
  const [jobApply, setJobApply] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    fetch("/v2/people/reportSet.php?type=JOBAPPLY", {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setJobApply(result.jobStatus);
        },
        (error) => {
          console.log("user error--", error);
        }
      );
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
          <td className="">{item.jobApplyText}</td>
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
