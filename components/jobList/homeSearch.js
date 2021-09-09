import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCity,
  jobStackoverflow,
  jobTwitter,
} from "../../store/actions/headerActions";
import useDebounce from "./use-debounce";

const HomeSearch = () => {
  const [jobTitleSearch, setJobTitleSearch] = useState("");
  const [jobLocSearch, setJobLocSearch] = useState("");
  const [cities, setCities] = useState();
  const city = useSelector((state) => state.headerReducer.city);
  const debouncedSearchTerm = useDebounce(jobLocSearch, 750);
  const dispatch = useDispatch();
  useEffect(() => {
    if (city && city.length !== 0) {
      setCities(city);
      // console.log("city list", city.length, city);
    }
  }, [city]);

  useEffect(() => {
    // if (city && city.length != 0) {
    //   setCities(city);
    // console.log("city list", city.length, city);
    // }
    if (debouncedSearchTerm) {
      // console.log("debouncedSearchTerm true ---", jobLocSearch);
      dispatch(fetchCity(jobLocSearch));
    }
  }, [debouncedSearchTerm]);

  const selectCity = (city) => {
    setJobLocSearch(city);
    setCities("");
  }
  const handleFilterChange = () => {
    dispatch(jobStackoverflow(jobTitleSearch, jobLocSearch));
    dispatch(jobTwitter());
  };

  return (
    <div className="text-center pt-5 pb-5 mt-5 mb-5">
      <div className="card-body">
        <h1>Start Searching for Job</h1>
        <div className="bg-light">
          <div className="card-body home">
            <div className="form-row align-items-center">
              <div className="col-md-6 col-sm-12 col-lg-6 form-group">
                <input
                  name="jobTitleSearch"
                  placeholder="Job Title or Keyword"
                  className="form-control"
                  onChange={(e) => setJobTitleSearch(e.target.value)}
                  type="text"
                  value={jobTitleSearch}
                />
              </div>
              <div className="col-md-5 col-sm-12 col-lg-5 form-group">
                <input
                  name="jobLocSearch"
                  placeholder="Job Location"
                  className="autocomplete form-control"
                  onChange={(e) => setJobLocSearch(e.target.value)}
                  type="text"
                  value={jobLocSearch}
                />
                <ul className="list-group autocomplete-items">
                  {cities &&
                    cities.map((city) => {
                      return (
                        <li
                          onClick={(e) => selectCity(city.label)}
                          className="list-group-item"
                          key={city.value}
                        >
                          {city.label}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="col-md-1 col-sm-1 col-lg-1 form-group">
                <Link
                  title="Search"
                  className="btn btn-info"
                  onClick={handleFilterChange}
                  to={"/job?title=" + jobTitleSearch + "&loc=" + jobLocSearch}
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeSearch;
