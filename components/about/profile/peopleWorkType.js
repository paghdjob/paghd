import React, { useState, useEffect } from "react";
import { GetApi, PostApi } from "../../webApi";

const PeopleWorkType = (props) => {
  const [workType, setWorkType] = useState(props.workType);
  const [worktypeList, setWorktypeList] = useState("");
  const [workTypeID, setWorkTypeID] = useState("");

  useEffect(async () => {
    const res = await GetApi("/v2/auto.php?type=WORKTYPE");
    setWorktypeList(res);
  }, [props]);

  const addWorkType = async () => {
    let body = { workTypeID: workTypeID };
    const res = await PostApi("/v2/people/aboutSet.php?type=ADDWORKTYPE", body);
    setWorkType(res.workType);
  };

  const removeWorkType = async (userWorkTypeID) => {
    let body = { userWorkTypeID: userWorkTypeID };
    const res = await PostApi(
      "/v2/people/aboutSet.php?type=DELETEWORKTYPE",
      body
    );
    setWorkType(res.workType);
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
