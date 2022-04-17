import React, { useState } from "react";
import Cookies from "universal-cookie";
import { PostApi } from "../../webApi";

const ProfileInfo = (props) => {
  const [userName, setUserName] = useState(props.userInfo.userName);
  const [userSlug, setUserSlug] = useState(props.userInfo.userSlug);
  const [message, setMessage] = useState("");
  const cookies = new Cookies();
  const userID = cookies.get("userID");
  const [editMode, setEditMode] = useState(true);

  const editProfile = (event) => {
    setEditMode(false);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    let users = {
      userID: userID,
      userSlug: userSlug,
      userName: userName,
      userStatus: 2,
    };
    event.preventDefault();
    PostApi(`/v2/people/aboutSet.php?type=PROFILEUPDATE`, users);
    setEditMode(true);
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
              <label>Profile URL : </label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  https://paghd.vercel.app/about/
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setUserSlug(e.target.value)}
                  name="userSlug"
                  value={userSlug}
                />
              </div>
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
            <p className="card-text col-md-6">Name : {userName}</p>
            <p className="card-text col-md-6">
              Profile URL : https://paghd.vercel.app/about/{userSlug}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
