import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import Link from "next/link";
import Cookies from "universal-cookie";

function Verify() {
  const [res, setRes] = useState("");
  const [isValid, setIsValid] = useState("");

  useEffect(() => {
    const id = location.search.replace("?id=", "") + "-U";

    const cookies = new Cookies();
    //const userIds = cookies.get('userID');
    const auth = cookies.get("auth");

    fetch("/v2/auth/verify.php", {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setRes(result.res);
          setIsValid(result.valid);

          console.log("result--", result);
        },
        (error) => {
          console.log("error--", error);
        }
      );
  }, []);

  return (
    <div>
      <HeadSeo
        title="Verify account with paghd.com"
        description="Apply To 117134 Job Openings In Bangalore: 818 In Jpmorgan, 701 In Accenture, 525 In Ibm &amp; 511 In Hp On paghd.com. Explore Latest Jobs In Bangalore Across Top Companies Now!"
        keywords="Verify account, paghd.com"
      />
      <HeaderNav />
      <div className="container">
        <div className="row">
          <h1 className="col-12">Verify your account</h1>
          <p className="col-12">
            If you need help with this account, please check the Help Centre and
            then contact us if needed.
          </p>
          <div className="col-6">
            <form className="needs-validation">
              <div className="form-group row">
                {isValid === "true" && (
                  <div className="alert alert-success">{res}</div>
                )}
                {isValid === "false" && (
                  <div className="alert alert-danger">{res}</div>
                )}
                <div className="col-sm-10">
                  <Link className="btn btn-primary" href="/login">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Verify;
