import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";

function PeopleSkill(props) {
  const [skill, setSkill] = useState(props.skill);
  const [addSkill, setAddSkill] = useState("");
  const [autoSkill, setAutoSkill] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const debouncedSearchTerm = useDebounce(addSkill, 750);

  const selectSkill = (skillName) => {
    setAddSkill(skillName);
    setAutoSkill("");
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchSkill(addSkill);
    }
  }, [debouncedSearchTerm]);

  const searchSkill = (skill) => {
    fetch("/v2/auto.php?type=SKILL&name=" + skill)
      .then((res) => res.json())
      .then(
        (result) => {
          setAutoSkill(result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const addSkills = () => {
    let body = { skillName: addSkill };

    fetch("/v2/people/aboutSet.php?type=ADDSKILL", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAddSkill("");
          setSkill(result.skill);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const removeSkill = (skiID) => {
    let body = { skiID: skiID };

    fetch("/v2/people/aboutSet.php?type=DELETESKILL", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSkill(result.skill);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  let skillView = skill.map((item) => {
    return (
      <span key={item.skiID} className="badge m-1 bg-secondary">
        <label className="p-2">{item.skillName}</label>
        <button
          onClick={removeSkill.bind(this, item.skiID)}
          type="button"
          className="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </span>
    );
  });
  let addSkillForm = (
    <form className="form-inline row mt-2">
      <div className="row g-3">
        <div className="col-md-1">
          <label className="text-left pl-0">Skills </label>
        </div>
        <div className="col-md">
          <input
            name="addSkill"
            placeholder="Type to search skill..."
            className="autocomplete form-control p-2"
            onChange={(e) => setAddSkill(e.target.value)}
            type="text"
            value={addSkill}
          />
          <ul className="list-group autocomplete-items">
            {autoSkill &&
              autoSkill.map((langName) => {
                return (
                  <li
                    onClick={(e) => selectSkill(langName.label)}
                    className="list-group-item text-start"
                    key={langName.label}
                  >
                    {langName.label}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="col-md">
          <button
            type="button"
            onClick={addSkills}
            className="btn btn-info my-1"
          >
            Add Skill
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Skills</div>
        <div className="card-body">
          {skillView}
          {addSkillForm}
        </div>
      </div>
    </div>
  );
}

export default PeopleSkill;
