import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import HeaderNav from "../components/common/headerNav";
import useDebounce from "../components/jobs/use-debounce";

export default function Home() {
  const [jobTitleSearch, setJobTitleSearch] = useState("software");
  const [jobLocSearch, setJobLocSearch] = useState("Mumbai, India");
  const [cities, setCities] = useState();
  const debouncedSearchTerm = useDebounce(jobLocSearch, 750);

  const searchLocation = (location) => {
    fetch("https://www.paghd.com/v2/auto.php?type=CITY&name=" + location)
      .then((res) => res.json())
      .then(
        (result) => {
          setCities(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error--", error);
        }
      );
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchLocation(jobLocSearch);
    }
  }, [debouncedSearchTerm]);

  const selectCity = (city) => {
    setJobLocSearch(city);
    setCities("");
  };
  const handleFilterChange = () => {
    // dispatch(jobStackoverflow(jobTitleSearch, jobLocSearch));
    // dispatch(jobTwitter());
  };

  return (
    <div>
      <Head>
        <title>Job search</title>
        <meta name="description" content="job search for you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav />
      <main>
        <div className="text-center pt-5 pb-5 mt-5 mb-5">
          <div className="card-body">
            <h1>Start Searching for Job - {process.env.NODE_ENV}</h1>

            <div className="bg-light">
              <div className="card-body home">
                <div className="row g-3">
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
                      href={
                        "/job?title=" + jobTitleSearch + "&loc=" + jobLocSearch
                      }
                    >
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
