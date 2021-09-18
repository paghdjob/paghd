import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";

const PeopleAddExperience = (props) => {
  const [userExp, setUserExp] = useState(props.userExp);
  const [isVisible, setIsVisible] = useState(props.isVisible);
  const [expDesignation, setExpDesignation] = useState(
    props.userExp.expDesignation
  );
  const [comName, setComName] = useState(props.userExp.comName);
  const [expDescribe, setExpDescribe] = useState(props.userExp.expDescribe);
  const [expRes, setExpRes] = useState(props.userExp.expRes);
  const [expStart, setExpStart] = useState(props.userExp.expStart);
  const [expEnd, setExpEnd] = useState(props.userExp.expEnd);
  const [message, setMessage] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  const handleSubmit = (event) => {
    let users = {
      expID: props.userExp.expID,
      userID: props.userExp.userID,
      expDesignation: expDesignation,
      expStart: expStart,
      expEnd: expEnd,
      expDescribe: expDescribe,
      expRes: expRes,
      comName: comName,
      jobFor: props.userExp.jobFor, // jobFor.toString()
    };

    fetch("/v2/people/aboutSet.php?type=EMPUPDATE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setMessage(result.msg);
        },
        (error) => {
          // setMessage(error);
          console.log("error--", error);
        }
      );
    event.preventDefault();
  };

  let item = {
    expID: "",
    userID: cookies.get("userID"),
    expDesignation: "",
    expStart: "",
    expEnd: "",
    expDescribe: "",
    expRes: "",
    expNotice: 0,
    comName: "",
    jobFor: "",
  };
  let boxModel;
  const closed = () => {
    setIsVisible(false);
  };

  let boxTitle, boxDes, boxCom, boxRes;
  if (props.userExp.jobFor === 0 || props.userExp.jobFor === "0") {
    boxTitle = "Add Your Experience Details";
    boxDes = "Role";
    boxCom = "Company";
    boxRes = "Responsibility";
  } else if (props.userExp.jobFor === 1 || props.userExp.jobFor === "1") {
    boxTitle = "Add Your Education Details";
    boxDes = "Degree / Course";
    boxCom = "School / Collage";
    boxRes = "Activities and societies";
  } else if (props.userExp.jobFor === 2 || props.userExp.jobFor === "2") {
    boxTitle = "Add Your Portfolio / Project Details";
    boxDes = "Project Title";
    boxCom = "Company";
    boxRes = "Responsibility";
  }

  let boxModelForEdit = (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">
          {boxTitle}
        </h5>
        {/* <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={closed}
        >
          close
        </button> */}
      </div>
      <div className="modal-body">
        <div className="row">
          <form>
            <div className="row">
              <div className="col-md-6">
                <label>{boxDes}</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setExpDesignation(e.target.value)}
                  name="expDesignation"
                  value={expDesignation}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>{boxCom}</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setComName(e.target.value)}
                  name="comName"
                  value={comName}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                rows="2"
                onChange={(e) => setExpDescribe(e.target.value)}
                name="expDescribe"
                value={expDescribe}
              ></textarea>
            </div>
            <div className="form-group">
              <label>{boxRes}:</label>
              <textarea
                className="form-control"
                rows="2"
                onChange={(e) => setExpRes(e.target.value)}
                name="expRes"
                value={expRes}
              ></textarea>
            </div>
            <div className="row">
              <div className="form-group col-md-5">
                <label>Starting Date</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setExpStart(e.target.value)}
                  name="expStart"
                  value={expStart}
                  required
                />
              </div>
              <div className="form-group col-md-5">
                <label>Ending Date</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setExpEnd(e.target.value)}
                  name="expEnd"
                  value={expEnd}
                  required
                />
              </div>
              {message}
              <div className="form-group col-md-2 mt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-info"
                  name="key"
                  value=""
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>{isVisible && <div className="card mb-1"> {boxModelForEdit}</div>}</>
  );
};

export default PeopleAddExperience;
