import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import HeaderNav from "../components/common/headerNav";
import FooterNav from "../components/common/footerNav";
import useDebounce from "../components/jobs/use-debounce";

import HeadSeo from "../components/headSeo";

//const HeadSeo = dynamic(() => import("../components/headSeo"), { ssr: true });

export default function Home() {
  const [jobTitleSearch, setJobTitleSearch] = useState("");
  const [jobLocSearch, setJobLocSearch] = useState("");
  const [cities, setCities] = useState();
  const debouncedSearchTerm = useDebounce(jobLocSearch, 750);

  const searchLocation = (location) => {
    fetch("https://www.paghd.com/v2/auto.php?type=CITY&name=" + location)
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
    if (debouncedSearchTerm) {
      searchLocation(jobLocSearch);
    }
  }, [debouncedSearchTerm]);

  const selectCity = (city) => {
    setJobLocSearch(city);
    setCities("");
  };
  const router = useRouter();
  const handleFilterChange = () => {
    const jobUrl = '/job?title=' + jobTitleSearch + '&loc=' + jobLocSearch;
    router.push(jobUrl);
  };

  return (
    <div>
      <HeadSeo
        title={
          "Jobs Search | Recruitment | Employment | Job Vacancies | PaghdJobs"
        }
        description={
          "Search for latest Jobs posted by top companies & consultants as per your skills, industry & locations. Post Resume & apply online for latest vacancy from PaghdJobs."
        }
        keywords={
          "jobs, online jobs, recruitment, job search, employment, job vacancies, vacancy, vacancies, job vacancy, job opportunities, latest vacancy"
        }
      />

      <HeaderNav />
      <main>
        <div className="container pt-5 pb-5 mt-5 mb-5">
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1>India’s Largest Job Platform & Professional Network</h1>
            <p className="fs-5 text-muted">
            Paghd is a popular professional networking site and is not a typical job portal, hence it works a bit differently than the traditional job portals.
            </p>
          </div>
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
                          className="list-group-item text-start"
                          key={city.value}
                        >
                          {city.label}
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
                  href={"/job?title=" + jobTitleSearch + "&loc=" + jobLocSearch}
                >
                  Find jobs
                </button>
              </div>
            </div>
          </div>
      </main>
      <FooterNav />
    </div>
  );
}
