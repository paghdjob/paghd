import React, { useState, useEffect } from "react";
import useDebounce from "../../jobs/use-debounce";
import Cookies from "universal-cookie";
import { GetApi, PostApi } from "../../webApi";

const JobCity = (props) => {
  const [countryList, setCountryList] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [cityList, setCityList] = useState("");
  const [city, setCity] = useState(props.city);
  const [cityName, setCityName] = useState("");
  const [isAutoSearch, setIsAutoSearch] = useState(false);
  const debouncedSearchTerm = useDebounce(cityName, 750);
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const userID = cookies.get("userID");

  useEffect(() => {
    if (debouncedSearchTerm && setIsAutoSearch) {
      searchCityName(cityName);
    }
    if (!countryList) {
      (async () => {
      const res = await GetApi("/v2/auto.php?type=COUNTRY")
      setCountryList(res);
      })()
    }
  }, [debouncedSearchTerm]);

  const searchCityName = async (cityName) => {
    if (cityName) {
      const res = await PostApi(`/v2/auto.php?type=CITY&name=${cityName}`)
      setCityList(res);
    }
  };

  const removeCity = async (jobCityID) => {
    const body = { jobCityID: jobCityID, userID: userID, jobID: props.jobID };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=DELETECITY", body)
    setCity(res.city);
  };

  const addLocation = async () => {
    const body = {
      cityName: cityName,
      countryCode: countryCode,
      jobID: props.jobID,
      userID: userID,
    };
    const res = await PostApi("/v2/jobs/aboutSet.php?type=ADDCITY", body)
    setCityList("");
    setCityName("");
    setCity(res.city);
  };

  const cityView =
    city &&
    city.map((item) => {
      return (
        <span key={item.jobCityID} className="badge m-1 bg-secondary">
          <label className="p-2">
            {item.cityName}, {item.countryCode}
          </label>
          <button
            onClick={removeCity.bind(this, item.jobCityID)}
            type="button"
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </span>
      );
    });

  const addcityForm = (
    <form className="row">
      <div className="form-group col-4">
        <label className="text-left pl-0">Country &nbsp;</label>
        <select
          className="form-control col-4"
          defaultValue={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          name="countryCode"
          value={countryCode}
          required
        >
          <option value="">Please select country</option>
          {countryList &&
            countryList.map((item) => (
              <option key={item.countryCode} value={item.countryCode}>
                {item.countryName}
              </option>
            ))}
        </select>
      </div>
      <div className="col-6">
        <label className="text-left pl-0">&nbsp;City</label>
        <input
          name="cityName"
          placeholder="Type to search city name..."
          className="autocomplete form-control p-2"
          onChange={(e) => {
            setIsAutoSearch(true), setCityName(e.target.value);
          }}
          type="text"
          value={cityName}
        />
        <ul className="list-group autocomplete-items">
          {cityList &&
            cityList.map((langName) => {
              return (
                <li
                  onClick={(e) => {
                    setCityName(langName.label), setCityList("");
                  }}
                  className="list-group-item text-start"
                  key={langName.label}
                >
                  {langName.label}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="col-2 mt-4">
        <button type="button" onClick={addLocation} className="btn btn-info">
          Add City
        </button>
      </div>
    </form>
  );

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">Job Opening Location</div>
        <div className="card-body">
          {cityView}
          {addcityForm}
        </div>
      </div>
    </div>
  );
};
export default JobCity;
