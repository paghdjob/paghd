import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import Cookies from "universal-cookie";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import useDebounce from "../../components/jobs/use-debounce";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
});

function Postjob(props) {
  const [jobTitle, setJobTitle] = useState("");
  const [comName, setComName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [useremail, setUseremail] = useState("");
  const [massage, setMassage] = useState("");
  const [comList, setComList] = useState("");
  const debouncedSearchTerm = useDebounce(comName, 750);
  const router = useRouter();

  const cookies = new Cookies();
  const userID = cookies.get("userID");
  const auth = cookies.get("auth");

  const handleData = () => {
    let jobObj = {
      jobTitle: jobTitle,
      jobDesc: jobDesc,
      comName: comName,
      userName: userName,
      useremail: useremail,
      userNumber: userNumber,
      userID: userID,
    };
    console.log(jobObj);
    if (jobTitle && comName) {
      fetch("/v2/jobs/aboutSet.php?type=POSTJOB", {
        method: "POST",
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(jobObj),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            router.push("/job/about/" + result.jobID);
            setMassage(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  };

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

  let userView;
  if (!userID) {
    userView = (
      <div className="rows mt-2">
        <div className="row">
          <div className="col-md-4">
            <label>User Name *</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
              value={userName}
              required
            />
          </div>
          <div className="col-md-3">
            <label>Contact Number </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUserNumber(e.target.value)}
              name="userNumber"
              value={userNumber}
            />
          </div>
          <div className="col-md-5">
            <label>User Email ID *</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setUseremail(e.target.value)}
              name="useremail"
              value={useremail}
              required
            />
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div>
      <HeadSeo
        title="Post New Job - Hire the right fit for your business. @ paghd.com"
        description="job seekers make better decisions about where to work. That means better results for employers at paghd.com"
        keywords="Better candidates, Better hires, paghd.com, post free job"
      />
      <HeaderNav />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1 className="h5">
              Post New Job - Hire the right fit for your business.
            </h1>
          </div>
          <div className="card-body">
            <form className="form-group">
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Job Title * </label>
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
                  <label>Company Name * </label>
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
                            onClick={(e) => selectCompany(city.cityName)}
                            className="list-group-item text-start"
                            key={city.value}
                          >
                            {city.cityName}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="form-group mt-2">
                <label>Job Description * </label>
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
              {userView}
              {massage.msg}
              <div className="rows text-right">
                <button
                  type="button"
                  onClick={handleData}
                  className="btn btn-info mt-2"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
          <div className="card-body">
            <h2 className="h5">Better candidates. Better hires.</h2>
            <p className="card-text">
              Job seekers make better decisions about where to work. That means
              better results for employers
            </p>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Postjob;
