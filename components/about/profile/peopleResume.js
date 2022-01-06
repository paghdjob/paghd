import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ProfileResume = (props) => {
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");
  const resumeUpload = "https://www.paghd.com/v2/resumeUpload.php?userID=" +userID+ "&auth="+auth;

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Resume Upload :</div>
        <div className="card-body row">
          <iframe
            src={resumeUpload}
            title="Resume Upload!"
            height="100"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ProfileResume;
