import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import useDebounce from "../../../components/jobs/use-debounce";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

const JobProfile = (props) => {
  console.log("JobProfile-----", props);
  const [jobInfo, setJobInfo] = useState(props.jobObj);
  const [jobTitle, setJobTitle] = useState(jobInfo.jobTitle);
  const [comName, setComName] = useState(jobInfo.comName);
  const [jobDesc, setJobDesc] = useState(jobInfo.jobDesc);
  const [jobSalaryCurrency, setJobSalaryCurrency] = useState(
    jobInfo.jobSalaryCurrency
  );
  const [jobSalaryStart, setJobSalaryStart] = useState(jobInfo.jobSalaryStart);
  const [jobSalaryEnd, setJobSalaryEnd] = useState(jobInfo.jobSalaryEnd);
  const [jobSalaryType, setJobSalaryType] = useState(jobInfo.jobSalaryType);
  const [jobYearStart, setJobYearStart] = useState(jobInfo.jobYearStart);
  const [jobYearEnd, setJobYearEnd] = useState(jobInfo.jobYearEnd);
  const [jobPosition, setJobPosition] = useState(jobInfo.jobPosition);
  const [jobStatus, setJobStatus] = useState(jobInfo.jobStatus);
  const [comList, setComList] = useState("");

  const debouncedSearchTerm = useDebounce(comName, 750);
  const cookies = new Cookies();
  const userID = cookies.get("userID");
  const auth = cookies.get("auth");

  const searchCompany = (name) => {
    fetch("/v2/auto.php?type=COMPANY&name=" + name)
      .then((res) => res.json())
      .then(
        (result) => {
          setComList(result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCompany(comName);
    }
  }, [debouncedSearchTerm]);

  const selectCompany = (company) => {
    setComName(company);
    setComList("");
  };

  const modules = {
    toolbar: [
      [{ header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  const handleChange = (value) => {
    setJobDesc(value);
  };

  const handleSubmit = (event) => {
    let jobs = {
      jobID: jobInfo.jobID,
      jobTitle: jobTitle,
      jobStatus: jobStatus,
      jobDesc: jobDesc,
      jobYearStart: jobYearStart,
      jobYearEnd: jobYearEnd,
      jobSalaryStart: jobSalaryStart,
      jobSalaryType: jobSalaryType,
      jobSalaryCurrency: jobSalaryCurrency,
      jobSalaryEnd: jobSalaryEnd,
      jobPosition: jobPosition,
      comName: comName,
    };
    console.log(jobs);
    if (jobTitle && comName) {
      fetch("/v2/jobs/aboutSet.php?type=PROFILEUPDATE", {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(jobs),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setJobInfo(result.job);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }

    event.preventDefault();
  };

  return (
    <div className="card" key={0}>
      <div className="card-body" key={jobInfo.jobID}>
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Job Title *</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setJobTitle(e.target.value)}
                name="jobTitle"
                value={jobTitle}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Company Name *</label>
              <input
                type="text"
                className="autocomplete form-control"
                onChange={(e) => setComName(e.target.value)}
                name="comName"
                value={comName}
                required
              />
              <ul className="list-group autocomplete-items">
                {comList &&
                  comList.map((city) => {
                    return (
                      <li
                        onClick={(e) => selectCompany(city.label)}
                        className="list-group-item text-start"
                        key={city.value}
                      >
                        {city.label}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="form-group  col-md-12">
              <label>Job Description *</label>
              <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                theme="snow"
                onChange={handleChange}
                name="jobDesc"
                value={jobDesc}
                rows="2"
              />
            </div>
          </div>
          <div className="rows">
            <div className="form-row">
              <div className="col-md-12">
                <label>Salary</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <input
                      type="text"
                      className="input-group-text"
                      onChange={(e) => setJobSalaryCurrency(e.target.value)}
                      name="jobSalaryCurrency"
                      value={jobSalaryCurrency}
                    />
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setJobSalaryStart(e.target.value)}
                    name="jobSalaryStart"
                    value={jobSalaryStart}
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text">to</div>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setJobSalaryEnd(e.target.value)}
                    name="jobSalaryEnd"
                    value={jobSalaryEnd}
                  />
                  <select
                    className="form-control"
                    onChange={(e) => setJobSalaryType(e.target.value)}
                    name="jobSalaryType"
                    value={jobSalaryType}
                  >
                    <option value="1">Per Year</option>
                    <option value="2">Per Month</option>
                    <option value="3">Per Day</option>
                    <option value="4">Per Hour</option>
                    <option value="5">Fixed</option>
                    <option value="6">As per industry standards</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-9">
                <label>Experience</label>
                <div className="input-group mb-2">
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setJobYearStart(e.target.value)}
                    name="jobYearStart"
                    value={jobYearStart}
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text">to</div>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setJobYearEnd(e.target.value)}
                    name="jobYearEnd"
                    value={jobYearEnd}
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text">Years</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Number of position</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="999"
                    onChange={(e) => setJobPosition(e.target.value)}
                    name="jobPosition"
                    value={jobPosition}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Job Status</label>
                  <select
                    className="form-control"
                    onChange={(e) => setJobStatus(e.target.value)}
                    name="jobStatus"
                    value={jobStatus}
                  >
                    <option value="0">NEW</option>
                    <option value="1">OPEN</option>
                    <option value="2">CLOSED</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-4 btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobProfile;
