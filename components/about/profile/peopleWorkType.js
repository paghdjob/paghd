import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const PeopleWorkType = (props) => {
  const [workType, setWorkType] = useState(props.workType);
  const [worktypeList, setWorktypeList] = useState("");
  const [workTypeID, setWorkTypeID] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  useEffect(() => {
    fetch("/v2/auto.php?type=WORKTYPE")
      .then((res) => res.json())
      .then(
        (result) => {
          setWorktypeList(result);
        },
        (error) => {
          console.log("user error--", error);
        }
      );
  }, [props]);

  const addWorkType = () => {
    let body = { workTypeID: workTypeID };
    fetch("/v2/people/aboutSet.php?type=ADDWORKTYPE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setWorkType(result.workType);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const removeWorkType = (userWorkTypeID) => {
    let body = { userWorkTypeID: userWorkTypeID };

    fetch("/v2/people/aboutSet.php?type=DELETEWORKTYPE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setWorkType(result.workType);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  let addWorkTypeForm = (
    <form className="mb-12 row">
      <div className="col-md-2 mb-3 mt-1 row">
        <label className="col-form-label">Job Type</label>
      </div>
      <div className="col-md-6">
        <select
          className="form-select"
          onChange={(e) => setWorkTypeID(e.target.value)}
          name="workTypeID"
        >
          <option value="">Please select your job types</option>
          {worktypeList &&
            worktypeList.map((item) => (
              <option key={item.workTypeID} value={item.workTypeID}>
                {item.workTypeName}
              </option>
            ))}
        </select>
      </div>
      <div className="col-md">
        <button type="button" className="btn btn-info" onClick={addWorkType}>
          Add Work Type
        </button>
      </div>
    </form>
  );

  let industryView = workType.map((item) => {
    return (
      <span key={item.userWorkTypeID} className="badge m-1 bg-secondary">
        <label className="p-2">{item.workTypeName}</label>
        <button
          onClick={removeWorkType.bind(this, item.userWorkTypeID)}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </span>
    );
  });

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Employment Type</div>
        <div className="card-body">
          {industryView}
          {addWorkTypeForm}
        </div>
      </div>
    </div>
  );
};
export default PeopleWorkType;
