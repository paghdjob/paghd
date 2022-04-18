import React, { useState } from "react";
import Cookies from "universal-cookie";
import { PostApi } from "../../webApi";

const PeoplePrivate = (props) => {
  const [userPrimaryEmail, setUserPrimaryEmail] = useState(
    props.userInfo.userPrimaryEmail
  );
  const [userSecondaryEmail, setUserSecondaryEmail] = useState(
    props.userInfo.userSecondaryEmail
  );
  const [userPrimaryNumber, setUserPrimaryNumber] = useState(
    props.userInfo.userPrimaryNumber
  );
  const [userSecondaryNumber, setUserSecondaryNumber] = useState(
    props.userInfo.userSecondaryNumber
  );
  const [userSkype, setUserSkype] = useState(props.userInfo.userSkype);
  const [message, setMessage] = useState("");

  const [editMode, setEditMode] = useState(true);
  const cookies = new Cookies();
  const auth = cookies.get("auth");

  const editProfile = (event) => {
    setEditMode(false);
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    let users = {
      userPrimaryEmail: userPrimaryEmail,
      userPrimaryNumber: userPrimaryNumber,
      userSecondaryEmail: userSecondaryEmail,
      userSecondaryNumber: userSecondaryNumber,
      userID: 258,
      userSkype: userSkype,
    };
    event.preventDefault();
    const res = await PostApi(
      "/v2/people/aboutSet.php?type=PRIVATEUPDATE",
      users
    );
    setMessage(res.msg);
    setEditMode(true);
  };

  let profileView;
  if (editMode === false) {
    profileView = (
      <form>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Primary Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setUserPrimaryEmail(e.target.value)}
              name="userPrimaryEmail"
              value={userPrimaryEmail}
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label>Secondary Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setUserSecondaryEmail(e.target.value)}
              name="userSecondaryEmail"
              value={userSecondaryEmail}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Primary Number</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setUserPrimaryNumber(e.target.value)}
              name="userPrimaryNumber"
              value={userPrimaryNumber}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Secondary Number </label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setUserSecondaryNumber(e.target.value)}
              name="userSecondaryNumber"
              value={userSecondaryNumber}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Skype ID</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUserSkype(e.target.value)}
              name="userSkype"
              value={userSkype}
            />
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className=" btn btn-info"
            >
              Save
            </button>
          </div>
        </div>
        {message}
      </form>
    );
  }
  return (
    <div className="rows">
      <div className="card mb-1">
        <div className="card-header">
          Personal Information
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
            <div className="card-body row">
              <p className="card-text col-md-6">
                Primary Email : {userPrimaryEmail}
              </p>
              <p className="card-text col-md-6">
                Secondary Email : {userSecondaryEmail}
              </p>
              <p className="card-text col-md-6">
                Primary Number : {userPrimaryNumber}
              </p>
              <p className="card-text col-md-6">
                Secondary Number: {userSecondaryNumber}
              </p>
              <p className="card-text col-md-6">Skype ID: {userSkype}</p>
            </div>
          )}
          {profileView}
        </div>
      </div>
    </div>
  );
};
export default PeoplePrivate;
