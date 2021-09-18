import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ProfileInfo = (props) => {
  const [user, setUser] = useState(props.userInfo);
  const [userAddress, setUserAddress] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userHeadline, setUserHeadline] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(true);
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  useEffect(() => {
    if (user && editMode && user.userAddress) { setUserAddress(user.userAddress) }
    if (user && editMode && user.userAbout) { setUserAbout(user.userAbout) }
    if (user && editMode && user.userHeadline) { setUserHeadline(user.userHeadline) }
    if (user && editMode && user.cityName) { setCityName(user.cityName) }
    if (user && editMode && user.countryCode) { setCountryCode(user.countryCode) }
  })

  const editProfile = (event) => {
    setEditMode(false);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    let users = {
      userAddress: userAddress,
      cityName: cityName,
      countryCode: countryCode,
      userBirth: "",
      userMarital: "1",
      userAbout: userAbout,
      userHeadline: userHeadline,
    };
    console.log("users handleSubmit", users);

    fetch("/v2/people/aboutSet.php?type=USERINFOUPDATE", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result--", result);
          setMessage(result.msg);
        },
        (error) => {
          // setMessage(error);
          console.log("error--", error);
        }
      );
    event.preventDefault();
  };
  let profileView;
  if (editMode === false) {
    profileView = (
      <form>
        <div className="form-group">
          <label>Address </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUserAddress(e.target.value)}
            name="userAddress"
            value={userAddress}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCityName(e.target.value)}
              name="cityName"
              value={cityName}
            />
          </div>
          <div className="col-md-6">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCountryCode(e.target.value)}
              name="countryCode"
              value={countryCode}
            />
          </div>
        </div>
        <div className="form-group">
          <label>About me:</label>
          <textarea
            className="form-control"
            rows="2"
            onChange={(e) => setUserAbout(e.target.value)}
            name="userAbout"
            value={userAbout}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Headline:</label>
          <textarea
            className="form-control"
            rows="2"
            onChange={(e) => setUserHeadline(e.target.value)}
            name="userHeadline"
            value={userHeadline}
          ></textarea>
        </div>
        {message}
        <button type="submit" className="btn btn-info" onClick={handleSubmit}>
          Save
        </button>
      </form>
    );
  }

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">
          Profile Headline
          <button
            name="key"
            value="0"
            onClick={editProfile}
            type="button"
            className="badge bg-info text-dark float-end"
          >
            Edit
          </button>
        </div>

        <div className="card-body">
          {editMode && (
            <div className="">
              <p className="card-text">About me : {userAbout}</p>
              <p className="card-text">Headline : {userHeadline}</p>
              <div className="row">
                <p className="card-text col-md-6">
                  location : {cityName}, {countryCode}
                </p>
                {/* <p className="card-text col-md-6">dob: {info && info.userBirth}</p> */}
              </div>
            </div>
          )}
          {profileView}
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
