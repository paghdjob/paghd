<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobFilter = (props) => {
  // console.log("JobFilter===", props.filt.city);
  const [filter, setFilter] = useState(props.filt);
  const [cityFilter, setCityFilter] = useState([]);
  const [workTypeFilter, setWorkTypeFilter] = useState([]);
  const [skillFilter, setSkillFilter] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [industryFilter, setIndustryFilter] = useState([]);

  const handleFilterChange = (event) => {
    if (event.target.name === 'city') {
      if (event.target.checked === true) {
        cityFilter.push(event.target.value);
      } else {
        let removedCity = cityFilter.indexOf(event.target.value);
         cityFilter.splice(removedCity, 1);
      }
    }
   
    if (event.target.name === 'workType') {
      if (event.target.checked === true) {
        workTypeFilter.push(event.target.value);
      } else {
        let removedWork = workTypeFilter.indexOf(event.target.value);
        workTypeFilter.splice(removedWork, 1);
      }
    }
    if (event.target.name === 'skill') {
      if (event.target.checked === true) {
        skillFilter.push(event.target.value);
      } else {
        var removedSkill = skillFilter.indexOf(event.target.value);
        skillFilter.splice(removedSkill, 1);
      }
    }
    if (event.target.name === 'language') {
      if (event.target.checked === true) {
        languageFilter.push(event.target.value);
      } else {
        let removedLang = languageFilter.indexOf(event.target.value);
        languageFilter.splice(removedLang, 1);
      }
    }
    if (event.target.name === 'industry') {
      if (event.target.checked === true) {
        industryFilter.push(event.target.value);
      } else {
        let removedInd = industryFilter.indexOf(event.target.value);
        industryFilter.splice(removedInd, 1);
      }
    }
    // console.log(cityFilter, workTypeFilter, skillFilter, languageFilter, industryFilter);
    props.handlerFromParant({
      cityID: cityFilter,
      workTypeID: workTypeFilter,
      skillID: skillFilter,
      langID: languageFilter,
      IndID: industryFilter,
      page: 0
    }); 
  }

  let cities = filter.city.map((data, key) => {
    return (
      <div key={data.cityID}>
        <label><input className="checkbox-control" onChange={handleFilterChange} type="checkbox" name="city" value={data.cityID} />
          &nbsp; {data.cityName}, {data.countryCode}</label>
      </div>
    );
  });
  let industry, workType, skills, languages;
  industry = filter.industry.map((data, key) => {
    return (
      <div key={data.IndID}>
        <label><input className="checkbox-control" onChange={handleFilterChange} type="checkbox" name="industry" value={data.IndID} />
          &nbsp; {data.IndName} ({data.tot})</label>
      </div>
    );
  });
  workType = filter.workType.map((data, key) => {
    return (
      <div key={data.workTypeID}>
        <label><input className="checkbox-control" onChange={handleFilterChange} type="checkbox" name="workType" value={data.workTypeID} />
          &nbsp; {data.workTypeName} ({data.tot})</label>
      </div>
    );
  });
  skills = filter.skills.map((data, key) => {
    return (
      <div key={data.skillID}>
        <label><input className="checkbox-control" onChange={handleFilterChange} type="checkbox" name="skill" value={data.skillID} />
          &nbsp;{data.skillName} ({data.tot})</label>
      </div>
    );
  });
  languages = filter.languages.map((data, key) => {
    return (
      <div key={data.langID}>
        <label><input className="checkbox-control" onChange={handleFilterChange} type="checkbox" name="language" value={data.langID} />
          &nbsp;{data.langName} ({data.tot}) </label>
      </div>
    );
  });
 return(
    <>
      <div className="card-header">City</div>
      <div className="card-body">{cities}</div>
      <div className="card-header">Industry</div>
      <div className="card-body">{industry}</div>
      <div className="card-header">Job Type</div>
      <div className="card-body">{workType}</div>
      <div className="card-header">Skill</div>
      <div className="card-body">{skills}</div>
      <div className="card-header">Language</div>
      <div className="card-body">{languages}</div>
    </>
 )
}

export default JobFilter;
=======
import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobFilter = (props) => {
  // console.log("JobFilter===", props.filt.city);
  const [filter, setFilter] = useState(props.filt);
  const [cityFilter, setCityFilter] = useState([]);
  const [workTypeFilter, setWorkTypeFilter] = useState([]);
  const [skillFilter, setSkillFilter] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [industryFilter, setIndustryFilter] = useState([]);

  const handleFilterChange = (event) => {
    if (event.target.name === "city") {
      if (event.target.checked === true) {
        cityFilter.push(event.target.value);
      } else {
        let removedCity = cityFilter.indexOf(event.target.value);
        cityFilter.splice(removedCity, 1);
      }
    }

    if (event.target.name === "workType") {
      if (event.target.checked === true) {
        workTypeFilter.push(event.target.value);
      } else {
        let removedWork = workTypeFilter.indexOf(event.target.value);
        workTypeFilter.splice(removedWork, 1);
      }
    }
    if (event.target.name === "skill") {
      if (event.target.checked === true) {
        skillFilter.push(event.target.value);
      } else {
        var removedSkill = skillFilter.indexOf(event.target.value);
        skillFilter.splice(removedSkill, 1);
      }
    }
    if (event.target.name === "language") {
      if (event.target.checked === true) {
        languageFilter.push(event.target.value);
      } else {
        let removedLang = languageFilter.indexOf(event.target.value);
        languageFilter.splice(removedLang, 1);
      }
    }
    if (event.target.name === "industry") {
      if (event.target.checked === true) {
        industryFilter.push(event.target.value);
      } else {
        let removedInd = industryFilter.indexOf(event.target.value);
        industryFilter.splice(removedInd, 1);
      }
    }
    // console.log(cityFilter, workTypeFilter, skillFilter, languageFilter, industryFilter);
    props.handlerFromParant({
      cityID: cityFilter,
      workTypeID: workTypeFilter,
      skillID: skillFilter,
      langID: languageFilter,
      IndID: industryFilter,
      page: 0,
    });
  };

  let cities = filter.city.map((data, key) => {
    return (
      <div key={data.cityID}>
        <label>
          <input
            className="checkbox-control"
            onChange={handleFilterChange}
            type="checkbox"
            name="city"
            value={data.cityID}
          />
          &nbsp; {data.cityName}, {data.countryCode} ({data.jobCount})
        </label>
      </div>
    );
  });
  let industry, workType, skills, languages;
  industry = filter.industry.map((data, key) => {
    return (
      <div key={data.IndID}>
        <label>
          <input
            className="checkbox-control"
            onChange={handleFilterChange}
            type="checkbox"
            name="industry"
            value={data.IndID}
          />
          &nbsp; {data.IndName} ({data.tot})
        </label>
      </div>
    );
  });
  workType = filter.workType.map((data, key) => {
    return (
      <div key={data.workTypeID}>
        <label>
          <input
            className="checkbox-control"
            onChange={handleFilterChange}
            type="checkbox"
            name="workType"
            value={data.workTypeID}
          />
          &nbsp; {data.workTypeName} ({data.tot})
        </label>
      </div>
    );
  });
  skills = filter.skills.map((data, key) => {
    return (
      <div key={data.skillID}>
        <label>
          <input
            className="checkbox-control"
            onChange={handleFilterChange}
            type="checkbox"
            name="skill"
            value={data.skillID}
          />
          &nbsp;{data.skillName} ({data.tot})
        </label>
      </div>
    );
  });
  languages = filter.languages.map((data, key) => {
    return (
      <div key={data.langID}>
        <label>
          <input
            className="checkbox-control"
            onChange={handleFilterChange}
            type="checkbox"
            name="language"
            value={data.langID}
          />
          &nbsp;{data.langName} ({data.tot})
        </label>
      </div>
    );
  });
  return (
    <>
      <div className="card-header">City</div>
      <div className="card-body">{cities}</div>
      <div className="card-header">Industry</div>
      <div className="card-body">{industry}</div>
      <div className="card-header">Job Type</div>
      <div className="card-body">{workType}</div>
      <div className="card-header">Skill</div>
      <div className="card-body">{skills}</div>
      <div className="card-header">Language</div>
      <div className="card-body">{languages}</div>
    </>
  );
};

export default JobFilter;
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
