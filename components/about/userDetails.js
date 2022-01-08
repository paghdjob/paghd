import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const UserDetails = (props) => {
  const [user, setUser] = useState(props.userObj);
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  useEffect(() => {
    if (auth) {
      let body = { userID: user.users.userID };
      fetch("/v2/people/aboutSet.php?type=VIEWJOB", {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(body),
      });
    }
  });

  let birth;
  if (user && user.userInfo) {
    birth = new Date(user.userInfo.userBirth).toDateString("yyyy-MM-dd");
  }

  let empView, eduView, proView, skillView, langView, indView;
  if (user && user.userExp) {
    const empResult = user.userExp.filter((item) => item.jobFor === "0");
    empView = empResult.map((item) => {
      let expStart = new Date(item.expStart).toDateString("yyyy-MM-dd");
      let expEnd = new Date(item.expEnd).toDateString("yyyy-MM-dd");
      return (
        <li className="list-group-item" key={item.expID}>
          <h5 className="card-title">
            {item.expDesignation} at {item.comName}
          </h5>
          <p className="text-muted">
            {expStart} to {expEnd}
          </p>
          <p className="card-text">{item.expDescribe} </p>
          <p className="card-text">{item.expRes} </p>
        </li>
      );
    });
    const eduResult = user.userExp.filter((item) => item.jobFor === "1");
    eduView = eduResult.map((item) => {
      let expStart = new Date(item.expStart).toDateString("yyyy-MM-dd");
      let expEnd = new Date(item.expEnd).toDateString("yyyy-MM-dd");
      return (
        <li className="list-group-item" key={item.expID}>
          <h5 className="card-title">
            {item.expDesignation} at {item.comName}
          </h5>
          <p className="text-muted">
            {expStart} to {expEnd}
          </p>
          <p className="card-text">{item.expDescribe} </p>
          <p className="card-text">{item.expRes} </p>
        </li>
      );
    });
    const proResult = user.userExp.filter((item) => item.jobFor === "2");
    proView = proResult.map((item) => {
      let expStart = new Date(item.expStart).toDateString("yyyy-MM-dd");
      let expEnd = new Date(item.expEnd).toDateString("yyyy-MM-dd");
      return (
        <li className="list-group-item" key={item.expID}>
          <h5 className="card-title">
            {item.expDesignation} at {item.comName}
          </h5>
          <p className="text-muted">
            {expStart} to {expEnd}
          </p>
          <p className="card-text">{item.expDescribe} </p>
          <p className="card-text">{item.expRes} </p>
        </li>
      );
    });

    if (user.userSkill.length !== 0) {
      skillView = user.userSkill.map((item) => {
        return <span key={item.skiID}>{item.skillName}, </span>;
      });
    }
    if (user.userIndustry.length !== 0) {
      indView = user.userIndustry.map((item) => {
        return <span key={item.IndID}>{item.IndName}, </span>;
      });
    }
    if (user.userLanguages.length !== 0) {
      langView = user.userLanguages.map((item) => {
        return <span key={item.lanID}>{item.langName}, </span>;
      });
    }
  }

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header text-center">
          <h1>{user && user.users && user.users.userName} </h1>
          <p className="text-center">
            {user && user.userInfo && user.userInfo.userHeadline}
          </p>
          {/* <div className="row">
              {user && user.userPrivate && user.userPrivate.userPrimaryEmail &&  
                <p className="col-sm-6 text-left">Email ID : {user && user.userPrivate && user.userPrivate.userPrimaryEmail && <span><i className="fa fa fa-envelope"></i><a href={"mailto:"+ user.userPrivate.userPrimaryEmail}> {user.userPrivate.userPrimaryEmail}</a></span>}</p>
              }
              {user && user.userPrivate && user.userPrivate.userPrimaryNumber &&  
                <p className="col-sm-6 text-left">Phone No. : {user && user.userPrivate && user.userPrivate.userPrimaryNumber}</p>
              }
            </div>
            {birth && <div className="row">
              {birth && <p className="col-sm-6 text-left">Birth date : {birth}</p>}
              <p className="col-sm-6 text-left">Marital : {user && user.userInfo && user.userInfo.userMarital === "1" ? "Married" : "Single"}</p>
            </div>} */}
          {user && user.userInfo && user.userInfo.userAddress && (
            <div className="rows">
              <p className="text-left">
                <b>Location :</b>
                {user && user.userInfo && user.userInfo.cityName},
                {user && user.userInfo && user.userInfo.countryCode}
              </p>
            </div>
          )}
        </div>
        {user && user.userInfo && user.userInfo.userAbout && (
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                {user && user.userInfo && user.userInfo.userAbout}
              </div>
            </div>
          </div>
        )}

        {skillView && (
          <div className="card-body">
            {skillView && (
              <p className="card-text">
                <b>Skill :</b> {skillView}
              </p>
            )}
            {indView && (
              <p className="card-text">
                <b>Industry :</b> {indView}
              </p>
            )}
            {langView && (
              <p className="card-text">
                <b>Language :</b> {langView}
              </p>
            )}
          </div>
        )}
        <div className="card-header">Experience</div>
        <ul className="list-group list-group-flush">{empView}</ul>
        <div className="card-header">Education</div>
        <ul className="list-group list-group-flush">{eduView}</ul>
        <div className="card-header">Project</div>
        <ul className="list-group list-group-flush">{proView}</ul>
      </div>
    </div>
  );
};

export default UserDetails;
