import React, { useState, useEffect } from "react";
import Link from "next/link";
const JobList = (props) => {
  const [list, setList] = useState(props.list);
  const [sorts, setSorts] = useState(1);
  const [pages, setPages] = useState(props.pages);

  const salaryTypes = (id) => {
    switch (id) {
      case "1":
        return "Per Year";
      case "2":
        return "Per Month";
      case "3":
        return "Per Day";
      case "4":
        return "Per Hour";
      case "5":
        return "Fixed";
      default:
        return "As per industry standards";
    }
  };
  const sortFieldChanges = (event) => {
    setSorts(event.target.value);
    props.handlerFromParant({ sorts: sorts, page: 0 });
  };
  const handleSubmit = () => {
    const pageNumber = pages + 1;
    setPages(pageNumber);
    props.handlerFromParant({ sorts: sorts, page: pageNumber });
  };
  let loadMore;
  if (list.length > 1) {
    loadMore = (
      <div className="clearfix text-center mt-3">
        <button className="col btn btn-info" onClick={handleSubmit}>
          Click here to Load more job...
        </button>
      </div>
    );
  }
  let loadJobMore;
  loadJobMore = list.map((data) => {
    return (
      <div className="card mt-3" key={data.jobID}>
        <div className="card-body">
          <div className="text-left">
            <h2 className="h5 card-title text-capitalize">
              <Link className="text-dark" href={"/job/" + data.jobSlug}>
                {data.jobTitle}
              </Link>
              {data.jobStatus === "1" && (
                <i title="Verified" className="bi bi-check-circle green"></i>
              )}
            </h2>
            <p className="text-capitalize text-muted">{data.comName}</p>
          </div>
          <div className="row">
            {data.cityName && (
              <span className="col-6 pb-1 text-capitalize text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                {`${data.cityName}, ${data.countryCode}`}
              </span>
            )}
            {data.workTypeName && (
              <span className="col-6 pb-1 text-capitalize text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.23 15.5c-6.801 0-10.367-1.221-12.23-2.597v9.097h24v-8.949c-3.218 2.221-9.422 2.449-11.77 2.449zm1.77 2.532c0 1.087-.896 1.968-2 1.968s-2-.881-2-1.968v-1.032h4v1.032zm-14-8.541v-2.491h24v2.605c0 5.289-24 5.133-24-.114zm9-7.491c-1.104 0-2 .896-2 2v2h2v-1.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6z" />
                </svg>
                {data.workTypeName}
              </span>
            )}
            <span className="col-6 pb-1 text-capitalize text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z" />
              </svg>
              {data.jobSalaryStart && (
                <>{`${data.jobSalaryStart} - ${data.jobSalaryEnd} ${data.jobSalaryCurrency}`}</>
              )}
              {salaryTypes(data.jobSalaryType)}
            </span>
            <span className="col-6 pb-1 text-capitalize text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
              </svg>
              {data.jobDate &&
                new Date(data.jobDate.replace(/-/g, "/")).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  });
  useEffect(() => {
    // if (list.length < 1) {
    setList(props.list);
    // console.log(props.list.length, "props.list with useEffect -->> ", list.length);
    // console.log("=== list-->>> ",list.length);

    // }
  }, [props]);

  return (
    <>
      {props.isFeature && (
        <div className="bg-light clearfix">
          <div className="float-end form-floating  col-md-2">
            <select
              onChange={sortFieldChanges}
              name="sorts"
              value={sorts}
              className="form-select"
            >
              <option value="1">Relevance</option>
              <option value="2">Newest</option>
              <option value="3">Oldest</option>
            </select>
            <label>Sort by :</label>
          </div>
        </div>
      )}
      {loadJobMore}
      {props.isFeature && <div className="row">{loadMore}</div>}
    </>
  );
};

export default JobList;
