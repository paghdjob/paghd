import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";
import { GetApi } from "../../webApi";

function JobLanguage(props) {
  const [languages, setLanguages] = useState(props.languages);
  const [addLanguage, setAddLanguage] = useState("");
  const [autoLanguage, setAutoLanguage] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");
  const debouncedSearchTerm = useDebounce(addLanguage, 750);
  const [isAutoSearch, setIsAutoSearch] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm && setIsAutoSearch) {
      searchLanguage(addLanguage);
    }
  }, [addLanguage]);

  const searchLanguage = async (language) => {
    if (language) {
      const res = await GetApi(`/v2/auto.php?type=LANGUAGES&name=${language}`)
      setAutoLanguage(res);
    }
  };

  const addLanguages = async () => {
    let body = { skillName: addLanguage, jobID: props.jobID, userID: userID };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=LANGUAGEUPDATE", body)
    setAddLanguage("");
    setLanguages(res.language);
  };
  const removeSkill = async (langID) => {
    let body = { jobLangID: langID, jobID: props.jobID, userID: userID };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=LANGUAGEDELETE", body)
    setLanguages(res.language);
  };
  const selectLanguage = (langName) => {
    setAddLanguage(langName);
    setAutoLanguage("");
    setIsAutoSearch(false);
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
            onChange={(e) => {
              setIsAutoSearch(true), setAddLanguage(e.target.value);
            }}
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
      <span key={item.langID} className="badge m-1 bg-secondary">
        <label className="p-2">{item.langName}</label>
        <button
          onClick={removeSkill.bind(this, item.jobLangID)}
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
        <div className="card-header">Job Languages</div>
        <div className="card-body">
          {skillView}
          {addLanguageForm}
        </div>
      </div>
    </div>
  );
}

export default JobLanguage;
