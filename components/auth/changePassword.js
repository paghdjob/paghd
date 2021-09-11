import React, { useEffect, useState } from "react";

const ChangePassword = () => {
  const [oldPwd, setOldPwd] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    let userDetails = {
      email: email,
      oldPwd: oldPwd,
      pwd: pwd,
    };
    console.log(userDetails);
    userIdentify(userDetails);
    event.preventDefault();
  };

  const userIdentify = (userDetails) => {
    if (userDetails.email !== "") {
      fetch("https://www.paghd.com/v2/auth/change-password.php", {
        method: "POST",
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("result--", result);
            setMessage(result.msg);
          },
          (error) => {
            setMessage(error);
            console.log("error--", error);
          }
        );
    }
  };

  return (
    <div id="login-overlay" className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">
            Change Password
          </h4>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setOldPwd(e.target.value)}
                name="oldPwd"
                value={oldPwd}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPwd(e.target.value)}
                name="pwd"
                value={pwd}
                required
              />
            </div>
            {message}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-info"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
