import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";

function PeopleLanguage(props) {
  const [languages, setLanguages] = useState(props.languages);
  const [addLanguage, setAddLanguage] = useState("");
  const [autoLanguage, setAutoLanguage] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const debouncedSearchTerm = useDebounce(addLanguage, 750);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchLanguage(addLanguage);
    }
  }, [debouncedSearchTerm]);

  const searchLanguage = (language) => {
    fetch("/v2/auto.php?type=LANGUAGES&name=" + language)
      .then((res) => res.json())
      .then(
        (result) => {
          setAutoLanguage(result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  const addLanguages = (lanID) => {
    let body = { skillName: addLanguage };

    fetch("/v2/people/aboutSet.php?type=LANGUAGEUPDATE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAddLanguage("");
          setLanguages(result.language);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };
  const removeSkill = (lanID) => {
    let body = { lanID: lanID };

    fetch("/v2/people/aboutSet.php?type=LANGUAGEDELETE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setLanguages(result.language);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };
  const selectLanguage = (langName) => {
    setAddLanguage(langName);
    setAutoLanguage("");
  };

  let skillView, addLanguageForm;

  addLanguageForm = (
    <form className="form-inline mt-2 row">
      <div className="row g-3">
        <div className="col-md-1">
          <label className="text-left pl-0">Language</label>
        </div>
        <div className="col-md">
          <input
            name="addLanguage"
            placeholder="Type to search language..."
            className="autocomplete form-control p-2"
            onChange={(e) => setAddLanguage(e.target.value)}
            type="text"
            value={addLanguage}
          />
          <ul className="list-group autocomplete-items">
            {autoLanguage &&
              autoLanguage.map((langName) => {
                return (
                  <li
                    onClick={(e) => selectLanguage(langName.label)}
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
            onClick={addLanguages}
            className="btn btn-info my-1"
          >
            Add Language
          </button>
        </div>
      </div>
    </form>
  );

  skillView = languages.map((item) => {
    return (
      <span key={item.lanID} className="badge m-1 bg-secondary">
        <label className="p-2">{item.langName}</label>
        <button
          onClick={removeSkill.bind(this, item.lanID)}
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
        <div className="card-header">Languages</div>
        <div className="card-body">
          {skillView}
          {addLanguageForm}
        </div>
      </div>
    </div>
  );
}

export default PeopleLanguage;
