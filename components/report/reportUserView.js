import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ReportUserView = (props) => {
  const [userView, setUserView] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    fetch("/v2/people/reportSet.php?type=USERVIEW", {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setUserView(result.userView);
        },
        (error) => {
          console.log("user error--", error);
        }
      );
  });

    let View;
    if (userView) {
      View = userView.map((item) => {
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
            <td>{new Date(item.userViewDate.replace(/-/g, '/')).toLocaleDateString()}</td>
          </tr>
        );
      });
    }
    return (
      <div className="rows">
        <div className="card table-responsive mb-1">
          <div className="card-header">Profile View Report </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>{View}</tbody>
          </table>
        </div>
      </div>
    );
  }

export default ReportUserView;
