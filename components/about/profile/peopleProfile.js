import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ProfileInfo = (props) => {
  const [userName, setUserName] = useState(props.userInfo.userName);
  const [userSlug, setUserSlug] = useState(props.userInfo.userSlug);
  const [message, setMessage] = useState("");
  const cookies = new Cookies();
  const auth = cookies.get("auth");
  const [editMode, setEditMode] = useState(false);

  const editProfile = (event) => {
    setEditMode(false);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    let users = {
      userID: 258,
      userSlug: userSlug,
      userName: userName,
      userStatus: 2,
    };
    console.log("users handleSubmit", users);

    fetch("/v2/people/aboutSet.php?type=PROFILEUPDATE", {
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
    setEditMode(true);
    event.preventDefault();
  };

  let profileView;
  if (editMode === false) {
    profileView = (
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-md-6">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
                name="userName"
                value={userName}
              />
            </div>
            <div className="col-md-6">
              <label>URL : </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUserSlug(e.target.value)}
                name="userSlug"
                value={userSlug}
              />
            </div>
            {/* <div className="form-group col-md-6">
            <label>Profile Image</label>
            <input type="text" className="form-control" onChange={this.fieldChange} name="userPic" value={users.userPic} />
          </div> 
          {info && info.userStatus !== "0" && <div className="form-group col-md-6">
            <label>Status</label>
            <select className="form-control col-sm-8" onChange={this.fieldChange} name="userStatus" value={users.userStatus}>
              <option value="1">Private</option>
              <option value="2">Public</option>
            </select>              
  </div> */}
          </div>
          {message}
          <button type="submit" onClick={handleSubmit} className="btn btn-info">
            Save
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">
          Primary Profile details :
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
        {profileView}
        {editMode && (
          <div className="card-body row">
            <p className="card-text col-md-6">
              Name : {props.userInfo.userName}
            </p>
            <p className="card-text col-md-6">
              Profile URL : {props.userInfo.userSlug}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
