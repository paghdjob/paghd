import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ReportJobAccess = (props) => {
  const [jobAccess, setJobAccess] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    fetch("/v2/people/reportSet.php?type=JOBACCESS", {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    }).then((res) => res.json())
      .then(
        (result) => {
          setJobAccess(result.jobAccess);
        },
        (error) => {
          console.log("user error--", error);
        }
      );
  }, []);

  const onJobVerify = (jobSlug) => {
    let body = '?jobID='+ jobSlug + '&fb='+ localStorage.getItem('facebook_access_token');

    //https://www.paghd.com/v2/autopost/fb/postJobFb.php?jobID=2955&fb=EAACwleCpshEBAFYIZCdcviIRZCnX2Oif7f92kgQe6iAJIl5ABy7MR2o9tucnu011exi8ALNZAVMVEUpUEu8nuJivmOHQH3nYTqKh5XZBsevRArdVCh4g1QaVI8VqjqZCNAte84WKelIthv9DWl1mZBG7pxxfnRmtN42EZBKMHKo1A71a9okRZAiStIA2n5kwRyLtrZACwPqn9rp20ntp4spii
    fetch("v2/autopost/fb/postJobFb.php?" + body, {
      method: "GET",
      headers: {
        Authorization: auth,
      }
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

 

  let userView;
  if (jobAccess) {
    userView = jobAccess.map((item) => {
      return (
        <tr key={item.jobAccessID}>
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
          <td>
            <a
              className="text-info"
              rel="noopener noreferrer"
              target="_blank"
              href={"job/about/" + item.jobSlug}
            >
              {item.applyCount}
            </a>
          </td>
          <td>
            <a
              className="text-info"
              rel="noopener noreferrer"
              target="_blank"
              href={"job/about/" + item.jobSlug}
            >
              {item.userCount}
            </a>
          </td>
          <td>{item.jobStatus === "2" ? "Closed" : "Open"}</td>
          <td>{new Date(item.jobDate.replace(/-/g, '/')).toLocaleDateString()}</td>
          <td
            className={
              item.jobVerify === "0" ? "alert-danger" : "alert-success"
            }
          >
            {item.jobVerify === "0" ? (
              <a
                className="text-info"
                rel="noopener noreferrer"
                target="_blank"
                href={
                  "job/" +
                  item.jobSlug +
                  "?-" +
                  item.userpin +
                  "-J-" +
                  item.userID +
                  "-" +
                  item.jobID
                }
              >
                Verify your job
              </a>
            ) : (
              "Verified"
            )}
          </td>
          {userID === "258" && (
            <td>
              <button
                type="submit"
                className="btn btn-info"
                onClick={onJobVerify.bind(this, item.jobID)}
              >
                FB post
              </button>
            </td>
          )}
        </tr>
      );
    });
  }

  return (
    <div className="rows">
      <div className="card table-responsive mb-1">
        <div className="card-header">Job Access Report</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Apply</th>
              <th scope="col">View</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Verify</th>
              {userID === "258" && <th scope="col">FB post</th>}
            </tr>
          </thead>
          <tbody>{userView}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportJobAccess;
