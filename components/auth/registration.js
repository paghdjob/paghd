import React, { useEffect, useState } from "react";
import { GetApi, PostApi } from "../webApi";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    let userDetails = {
      name: name,
      email: email,
      pwd: pwd,
    };
    console.log(userDetails);
    userIdentify(userDetails);
    event.preventDefault();
  };

  const regEmail = (userID) => {
    GetApi(`v2/auth/EmailTemplate.php?type=REGISTRATION&userID=${userID}`);
  };

  const userIdentify = async (userDetails) => {
    if (userDetails.email !== "") {
      const res = await PostApi("/v2/auth/registration.php", userDetails);
      setMessage(res.msg);
      regEmail(res.userID);
    }
  };

  return (
    <div id="login-overlay" className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">
            Registration
          </h4>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                required
              />
            </div>
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
              <label className="form-label">Password</label>
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Registration;
