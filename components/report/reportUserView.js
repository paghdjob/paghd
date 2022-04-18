import React, { useState, useEffect } from "react";
import { GetApi } from "../webApi";

const ReportUserView = (props) => {
  const [userView, setUserView] = useState("");

  useEffect(() => {
    (async () => {
      const res = await GetApi(`/v2/people/reportSet.php?type=USERVIEW`);
      setUserView(res.userView);
    })()
  }, [props]);

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
          <td>
            {new Date(
              item.userViewDate.replace(/-/g, "/")
            ).toLocaleDateString()}
          </td>
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
};

export default ReportUserView;
