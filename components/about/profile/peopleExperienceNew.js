import React, { useState, useEffect } from "react";
import PeopleAddExperience from "../profile/peopleAddExperience";
import Cookies from "universal-cookie";
import { PostApi } from "../../webApi";

const PeopleExperienceNew = (props) => {
  const [userExp, setUserExp] = useState(props.userExp);
  const [isAddExp, setIsAddExp] = useState(false);
  const [isAddEdu, setIsAddEdu] = useState(false);
  const [isAddPro, setIsAddPro] = useState(false);
  // const [isVisible, setIsVisible] = useState(true);
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  const [newObj, setNewObj] = useState({
    expID: "",
    userID: cookies.get("userID"),
    expDesignation: "",
    expStart: "",
    expEnd: "",
    expDescribe: "",
    expRes: "",
    expNotice: 0,
    comName: "",
    jobFor: "4",
  });

  useEffect(() => {
    console.log("props refresh");
  }, [props]);

  const removeEmp = (async (expID) => {
    const users = { expID: expID };
    const res = await PostApi(`/v2/people/aboutSet.php?type=EMPDELETE`, users)
    setUserExp(res.employment);
  });

  const popup = (jobFor, expID) => {
    setUserExp(props.userExp);
    if (jobFor === 0) {
      newObj.jobFor = jobFor;
      setIsAddExp(true);
      setIsAddEdu(false);
      setIsAddPro(false);
    } else if (jobFor === 1) {
      newObj.jobFor = jobFor;
      setIsAddEdu(true);
      setIsAddExp(false);
      setIsAddPro(false);
    } else if (jobFor === 2) {
      newObj.jobFor = jobFor;
      setIsAddPro(true);
      setIsAddEdu(false);
      setIsAddExp(false);
    }
    if (expID) {
      let a = userExp.filter((detail) => detail.expID === expID);
      // a[0].jobFor = jobFor;
      setNewObj(a[0]);
    } else {
      setNewObj(newObj);
    }
    // console.log("jobFor --", jobFor, "expID --", expID,  "userExp --", userExp);
  };

  /* view  */
  let empView, eduView, proView;
  if (userExp) {
    const empResult = userExp.filter((detail) => detail.jobFor === "0");
    empView = empResult.map((detail) => {
      // if (detail.expID === newObj.expID) {
      //   return boxModelForEdit;
      // }
      let expStart = new Date(detail.expStart).toDateString("yyyy-MM-dd");
      let expEnd = new Date(detail.expEnd).toDateString("yyyy-MM-dd");
      return (
        <div className="rows" key={detail.expID}>
          <div className="section">
            <button
              name="key"
              value={detail.expID}
              onClick={removeEmp.bind(this, detail.expID)}
              type="button"
              className="m-1 badge bg-info text-dark float-end"
            >
              Delete
            </button>
            <button
              name="key"
              value={detail.expID}
              onClick={popup.bind(this, 0, detail.expID)}
              type="button"
              className="m-1 badge bg-info text-dark float-end"
            >
              Edit
            </button>
          </div>
          <h6 className="card-text">
            {detail.expDesignation} at {detail.comName}
          </h6>
          <p className="text-text">
            Year : {expStart} to {expEnd}
          </p>
          <p className="text-text">{detail.expDescribe}</p>
          <p className="text-text">{detail.expRes}</p>
        </div>
      );
    });
    const eduResult = userExp.filter((detail) => detail.jobFor === "1");
    eduView = eduResult.map((detail) => {
      // if (detail.expID === newObj.expID) {
      //   return boxModelForEdit;
      // }
      let expStart = new Date(detail.expStart).toDateString("yyyy-MM-dd");
      let expEnd = new Date(detail.expEnd).toDateString("yyyy-MM-dd");
      return (
        <div className="border-bottom" key={detail.expID}>
          <div className="rows">
            <div className="section">
              <button
                name="key"
                value={detail.expID}
                onClick={removeEmp.bind(this, detail.expID)}
                type="button"
                className="m-1 badge bg-info text-dark float-end"
              >
                Delete
              </button>
              <button
                name="key"
                value={detail.expID}
                onClick={popup.bind(this, 1, detail.expID)}
                type="button"
                className="m-1 badge bg-info text-dark float-end"
              >
                Edit
              </button>
            </div>
            <h6 className="card-text">
              {detail.expDesignation} at {detail.comName}
            </h6>
            <p className="text-text">
              Year : {expStart} to {expEnd}
            </p>
            <p className="text-text">{detail.expDescribe}</p>
            <p className="text-text">{detail.expRes}</p>
          </div>
        </div>
      );
    });

    const proResult = userExp.filter((detail) => detail.jobFor === "2");
    proView = proResult.map((detail) => {
      // if (detail.expID === newObj.expID) {
      //   return boxModelForEdit;
      // }
      let expStart = new Date(detail.expStart).toDateString("yyyy-MM-dd");
      let expEnd = new Date(detail.expEnd).toDateString("yyyy-MM-dd");
      return (
        <div className="rows" key={detail.expID}>
          <div className="section">
            <button
              name="key"
              value={detail.expID}
              onClick={removeEmp.bind(this, detail.expID)}
              type="button"
              className="m-1 badge bg-info text-dark float-end"
            >
              Delete
            </button>
            <button
              name="key"
              value={detail.expID}
              onClick={popup.bind(this, 2, detail.expID)}
              type="button"
              className="m-1 badge bg-info text-dark float-end"
            >
              Edit
            </button>
          </div>
          <h6 className="card-text">
            {detail.expDesignation} at {detail.comName}
          </h6>
          <p className="text-text">
            Year : {expStart} to {expEnd}
          </p>
          <p className="text-text">{detail.expDescribe}</p>
          <p className="text-text">{detail.expRes}</p>
        </div>
      );
    });
  }
  const handleData = (obj) => {
    console.log("---handleData -data obj----", obj);
    setUserExp(obj);
    // setIsVisible(false);
    setIsAddPro(false);
    setIsAddEdu(false);
    setIsAddExp(false);
  };

  return (
    <div className="card mb-1">
      <div className="card-header">
        Experience
        <button
          name="key"
          value="0"
          onClick={popup.bind(this, 0, null)}
          type="button"
          className="badge bg-info text-dark float-end"
          aria-label="Add"
        >
          Add
        </button>
      </div>
      <div className="card-body">
        {isAddExp && (
          <PeopleAddExperience
            userExp={newObj}
            isVisible={isAddExp}
            handlerFromParant={handleData}
          />
        )}
        {empView}
      </div>
      <div className="card-header">
        Education
        <button
          name="key"
          value="1"
          onClick={popup.bind(this, 1, null)}
          type="button"
          className="badge bg-info text-dark float-end"
          aria-label="Add"
        >
          Add
        </button>
      </div>
      <div className="card-body">
        {isAddEdu && (
          <PeopleAddExperience
            userExp={newObj}
            isVisible={isAddEdu}
            handlerFromParant={handleData}
          />
        )}
        {eduView}
      </div>
      <div className="card-header">
        Portfolio / Project
        <button
          name="key"
          value="2"
          onClick={popup.bind(this, 2, null)}
          type="button"
          className="badge bg-info text-dark float-end"
          aria-label="Add"
        >
          Add
        </button>
      </div>
      <div className="card-body">
        {isAddPro && (
          <PeopleAddExperience
            userExp={newObj}
            isVisible={isAddPro}
            handlerFromParant={handleData}
          />
        )}
        {proView}
      </div>
    </div>
  );
};
export default PeopleExperienceNew;
