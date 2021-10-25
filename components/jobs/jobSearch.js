import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import useDebounce from "./use-debounce";

const JobSearch = (props) => {
  const [jobTitleSearch, setJobTitleSearch] = useState("");
  const [jobLocSearch, setJobLocSearch] = useState("");
  const [cities, setCities] = useState();
  const debouncedSearchTerm = useDebounce(jobLocSearch, 750);
  const [isAutoSearch, setIsAutoSearch] = useState(false);

  const searchLocation = (location) => {
    fetch("/v2/auto.php?type=CITY&name=" + location)
      .then((res) => res.json())
      .then(
        (result) => {
          setCities(result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  useEffect(() => {
    if (debouncedSearchTerm && isAutoSearch) {
      searchLocation(jobLocSearch);
    }
  }, [debouncedSearchTerm]);

  const selectCity = (city) => {
    setJobLocSearch(city);
    setCities("");
    setIsAutoSearch(false);
  };
  const router = useRouter();
  //   const handleFilterChange = () => {
  //     const jobUrl = "/job?title=" + jobTitleSearch + "&loc=" + jobLocSearch;
  //     router.push(jobUrl);
  //   };
  const handleFilterChange = (event) => {
    props.handlerFromParant({ sorts: 0, page: 0, loc: jobLocSearch, title: jobTitleSearch });
  };

  return (
    <main>
      <div className="row">
        <div className="col-md-5 col-sm-12 col-lg-5 form-group mb-2">
          <input
            name="jobTitleSearch"
            placeholder="Job Title or Keyword"
            className="form-control p-3"
            onChange={(e) => setJobTitleSearch(e.target.value)}
            type="text"
            value={jobTitleSearch}
          />
        </div>
        <div className="col-md-5 col-sm-12 col-lg-5 form-group mb-2">
          <input
            name="jobLocSearch"
            placeholder="Job Location"
            className="autocomplete form-control p-3"
            onChange={(e) => {
              setIsAutoSearch(true), setJobLocSearch(e.target.value);
            }}
            type="text"
            value={jobLocSearch}
          />
          <ul className="list-group autocomplete-items">
            {cities &&
              cities.map((city) => {
                return (
                  <li
                    onClick={(e) => selectCity(city.cityName)}
                    className="list-group-item text-start"
                    key={city.value}
                  >
                    {city.cityName +', '+ city.countryName +' ('+ city.jobCount +')'}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="col-md-2 col-sm-12 col-lg-2 form-group">
          <button
            title="Search"
            className="btn btn-info pt-3 pb-3"
            onClick={handleFilterChange}
            // onClick={handleFilterChange}
            // href={"/job?title=" + jobTitleSearch + "&loc=" + jobLocSearch}
          >
            Search
          </button>
        </div>
      </div>
    </main>
  );
};

export default JobSearch;
