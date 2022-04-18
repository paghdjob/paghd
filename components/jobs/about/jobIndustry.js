import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { GetApi, PostApi } from "../../webApi";

const JobIndustry = (props) => {
  const [industry, setIndustry] = useState(props.industry);
  const [industryList, setIndustryList] = useState("");
  const [indID, setIndID] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    (async () => {
    const res = await GetApi("/v2/auto.php?type=INDUSTRY")
    setIndustryList(res);
    })()
  }, [props]);

  const addIndustries = async () => {
    let body = { IndID: indID, jobID: props.jobID, userID: userID };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=ADDINDUSTRY", body)
    setIndustry(res.industry);
  };

  const removeIndustry = async (IndID) => {
    let body = { indId: IndID, jobID: props.jobID, userID: userID };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=DELETEINDUSTRY", body)
    setIndustry(res.industry);
  };

  let industryView = industry.map((item) => {
    return (
      <span key={item.IndID} className="badge m-1 bg-secondary">
        <label className="p-2">{item.IndName}</label>
        <button
          onClick={removeIndustry.bind(this, item.IndID)}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </span>
    );
  });

  let addIndustryForm = (
    <form className="mb-12 row g-2">
      <div className="col-md-2 mb-3 mt-1 row">
        <label className="my-1 mr-2">Job Industry</label>
      </div>
      <div className="col-md-6">
        <select
          className="form-select"
          onChange={(e) => setIndID(e.target.value)}
          name="IndID"
        >
          <option value="">Please select your industry</option>
          {industryList &&
            industryList.map((item) => (
              <option key={item.IndID} value={item.IndID}>
                {item.IndName}
              </option>
            ))}
        </select>
      </div>
      <div className="col-md-3">
        <button type="button" onClick={addIndustries} className="btn btn-info">
          Add Industry
        </button>
      </div>
    </form>
  );

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Job Industry</div>
        <div className="card-body">
          {industryView}
          {addIndustryForm}
        </div>
      </div>
    </div>
  );
};
export default JobIndustry;
