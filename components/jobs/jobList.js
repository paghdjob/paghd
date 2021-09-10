import React, { useState, useEffect } from "react";
import Link from "next/link";
const JobList = (props) => {
  // console.log("JobList props.page -->> ", props.list.length);
  const [list, setList] = useState(props.list);
  const [sorts, setSorts] = useState(1);
  const [pages, setPages] = useState(props.pages);
  // console.log(pages, "=====", pages);
  // useEffect(() => {
  //   SetList(props.list);
  //    console.log(props.list.length, "props.list with useEffect -->> ", list.length);
  // }, [props]);

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
  }
  const sortFieldChanges = (event) => {
    setSorts(event.target.value);
    props.handlerFromParant({ sorts: sorts, page: 0 });
  }
  const handleSubmit = () => {
    const pageNumber = pages + 1;
    setPages(pageNumber);
    props.handlerFromParant({ sorts: sorts, page: pages });
  }
  let loadMore;
  if (list.length > 1) {
    loadMore = <div className="card-body">
    <div className="rows align-items-center">
      <button className="col btn btn-outline-warning" onClick={handleSubmit}> Result: {list.length}, page : {pages}, Load more...   </button>
    </div>
  </div>

  }
  let loadJobMore;
  loadJobMore = list.map((data) => {
    return (
      <div className="card" key={data.jobID}>
        <div className="pb-0 card-body">
          <div className="float-left mr-3"><i className="bi bi-briefcase icon32 disabled" aria-hidden="true"></i></div>
          <div className="text-left"><h6 className="card-title text-capitalize mb-1"><Link className="text-dark" href={'/job/' + data.jobSlug}>{data.jobTitle}</Link> {data.jobStatus === "1" && <i title="Verified" className="bi bi-check-circle green"></i>}</h6>
            <p className="text-capitalize text-muted">{data.comName}</p></div>
        </div>
        <div className="card-footer">
          {data.cityName && <span className="text-capitalize"> <i className="bi bi-map-marker" aria-hidden="true"></i> {data.cityName} {data.countryCode}</span>}
          {data.workTypeName && <span className="text-capitalize"> <i className="bi bi-briefcase" aria-hidden="true"></i> {data.workTypeName}</span>}
          {data.jobSalaryStart && <span className="text-capitalize"> <i className="bi bi-inr" aria-hidden="true"></i> {data.jobSalaryStart} - {data.jobSalaryEnd}</span>}
          {salaryTypes(data.jobSalaryType)} &nbsp; <i className="bi bi-clock-o icon" aria-hidden="true"></i> {new Date(data.jobDate).toLocaleDateString()}
        </div>
      </div>
    )
  });
   useEffect(() => {
  // if (list.length < 1) {
    setList(props.list);
    // console.log(props.list.length, "props.list with useEffect -->> ", list.length);
    // console.log("=== list-->>> ",list.length);

 // }
 }, [props]);
//  console.log("props.list -->> ", loadJobMore);


  return (
    <div className="card">
      <div className="rows bg-light col-2">
        <div className="col-md">
          <div className="form-floating">
            <select onChange={sortFieldChanges} name="sorts" value={sorts} className="form-select">
              <option value="1">Reletive</option>
              <option value="2">Newest</option>
              <option value="3">Oldest</option>
            </select>
            <label>Sort by :</label>
          </div>
        </div>
      </div>
      {/* <div className="row">
        {list && list.map((data) => (
            <div className="pl-0 pb-2 col-md-6 col-lg-6 col-xl-4" key={data.jobID}>
              <div className="card">
                <div className="pb-0 card-body">
                  <div className="float-left mr-3"><i className="bi bi-briefcase icon32 disabled" aria-hidden="true"></i></div>
                  <div className="text-left"><h6 className="card-title text-capitalize mb-1"><Link className="text-dark" href={'/job/' + data.jobSlug}>{data.jobTitle}</Link> {data.jobStatus === "1" && <i title="Verified" className="bi bi-check-circle green"></i>}</h6>
                    <p className="text-capitalize text-muted">{data.comName}</p></div>
                </div>
                <div className="card-footer">
                  {data.cityName && <span className="text-capitalize"> <i className="bi bi-map-marker" aria-hidden="true"></i> {data.cityName} {data.countryCode}</span>}
                  {data.workTypeName && <span className="text-capitalize"> <i className="bi bi-briefcase" aria-hidden="true"></i> {data.workTypeName}</span>}
                  {data.jobSalaryStart && <span className="text-capitalize"> <i className="bi bi-inr" aria-hidden="true"></i> {data.jobSalaryStart} - {data.jobSalaryEnd}</span>}
                  {salaryTypes(data.jobSalaryType)} &nbsp; <i className="bi bi-clock-o icon" aria-hidden="true"></i> {new Date(data.jobDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            ))}
      </div> */}
      <div className="row">
        {loadJobMore}
      </div>
      {loadMore}

      
    </div>
  );
};

export default JobList;