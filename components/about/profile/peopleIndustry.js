import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const PeopleIndustry = (props) => {
  const [industry, setIndustry] = useState(props.industry);
  const [industryList, setIndustryList] = useState("");
  const [indID, setIndID] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  useEffect(() => {
    fetch("/v2/auto.php?type=INDUSTRY")
      .then((res) => res.json())
      .then(
        (result) => {
          setIndustryList(result);
        },
        (error) => {
          console.log("user error--", error);
        }
      );
  }, [props]);

  const addIndustries = () => {
    let body = { IndID: indID };
    fetch("/v2/people/aboutSet.php?type=ADDINDUSTRY", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIndustry(result.industry);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const removeIndustry = (IndID) => {
    let body = { IndID: IndID };

    fetch("/v2/people/aboutSet.php?type=DELETEINDUSTRY", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIndustry(result.industry);
        },
        (error) => {
          console.log("error--", error);
        }
      );
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
    <form className="mb-12 row">
      <div className="col-md-2 mb-3 mt-1 row">
        <label className="my-1 mr-2">Industry</label>
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
        <div className="card-header">Industry</div>
        <div className="card-body">
          {industryView}
          {addIndustryForm}
        </div>
      </div>
    </div>
  );
};

export default PeopleIndustry;
