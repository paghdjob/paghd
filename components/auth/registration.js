import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    let userDetails = {
      name: name,
      email: email,
      pwd: pwd
    }  
    console.log(userDetails);
    userIdentify(userDetails);
    event.preventDefault();
  };

  const userIdentify = (userDetails) => {
    if (userDetails.email !== "") {
      fetch("https://www.paghd.com/v2/auth/registration.php", {
        method: "POST",
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // console.log("result--", result);
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
              <input type="password" className="form-control" onChange={(e) => setPwd(e.target.value)} name="pwd" value={pwd} required />
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