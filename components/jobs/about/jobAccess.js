import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";

const JobAccess = (props) => {
  const [access, setAccess] = useState(props.jobAccess);
  const [addAccess, setAddAccess] = useState("");
  const [autoUser, setAutoUser] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");
  const debouncedSearchTerm = useDebounce(addAccess, 750);

  const removeHrAcess = (jobAccessID, id) => {
    let body = { jobAccessID: jobAccessID, jobID: props.jobAccess[0].jobID, userID: id };
    fetch("/v2/jobs/aboutSet.php?type=DELETEACCESS", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAccess(result.jobAccess);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };
  const addHrAccess = () => {
    let body = { jobID: props.jobAccess[0].jobID, userID: addAccess };
    fetch("/v2/jobs/aboutSet.php?type=ADDACCESS", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAddAccess("");
          setAccess(result.jobAccess);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };
  const selectSkill = (skillName) => {
    setAddAccess(skillName);
    setAutoUser("");
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchUsers(addAccess);
    }
  }, [debouncedSearchTerm]);

  const searchUsers = (skill) => {
    fetch("/v2/auto.php?type=USER&name=" + skill)
      .then((res) => res.json())
      .then(
        (result) => {
          setAutoUser(result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };


  let jobHrView =
    access &&
    access.map((item) => {
      return (
        <span key={item.jobAccessID} className="mr-3">
          {item.userID !== userID ? (
            <p className="badge m-1 bg-secondary">
              <label className="p-2">{item.userName}</label>
              <button
                onClick={removeHrAcess.bind(this, item.jobAccessID, item.userID)}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </p>
          ) : (
            <p className="badge m-1 bg-secondary">
              <a className="text-white" href={"about/" + item.userID}>
                <label className="p-2">{item.userName}</label>
              </a>
            </p>
          )}
        </span>
      );
    });

    let addAccessForm = (
      <form className="form-inline row mt-2">
        <div className="row g-3">
          <div className="col-md-2">
            <label className="text-left pl-0">HR Access </label>
          </div>
          <div className="col-md">
            <input
              name="addAccess"
              placeholder="Type to search skill..."
              className="autocomplete form-control p-2"
              onChange={(e) => setAddAccess(e.target.value)}
              type="text"
              value={addAccess}
            />
            <ul className="list-group autocomplete-items">
              {autoUser &&
                autoUser.map((user) => {
                  return (
                    <li
                      onClick={(e) => selectSkill(user.value)}
                      className="list-group-item text-start"
                      key={user.id}
                    >
                      {user.label}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              onClick={addHrAccess}
              className="btn btn-info my-1"
            >
              Add HR Access
            </button>
          </div>
        </div>
      </form>
    );

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">HR Access</div>
        <div className="card-body">
          {jobHrView}
          {addAccessForm}
        </div>
      </div>
    </div>
  );
};

export default JobAccess;
