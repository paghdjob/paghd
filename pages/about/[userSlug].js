import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import HeadSeo from "../../components/headSeo";
import UserDetails from "../../components/about/userDetails";
import Cookies from "universal-cookie";

function UserDetail(props) {
  // console.log("about ", props);
  const [userObj, setUserObj] = useState(props);
   
//   const [description, setDescription] = useState("");

 /* let jobdesc;
  if(jobObj.job && jobObj.job.jobDesc) {
    let desc = jobObj.job.jobDesc.replace(/(<([^>]+)>)/gi, "");
    jobdesc = desc.substring(0, 155);  
  }
*/
  /*
  useEffect(() => {
    // setDescription(jobdesc);
    if (Object.keys(props).length === 0) {
      fetch("https://www.paghd.com/v2/people/aboutNew.php?userSlug=" + location.pathname.replace("/about/", ""))
        .then((res) => res.json())
        .then(
          (result) => {
            console.log("result--", result);
            // setJobObj(result);
          },
          (error) => {
            console.log("error--", error);
          }
        );
    }
  }, []); */

  return (
    <div>
      <HeadSeo
        title={userObj.users.userName}
        description={userObj.userInfo !== null ? userObj.userInfo.userAbout : userObj.users.userName}
        keywords={userObj.userInfo !== null ? userObj.userInfo.userHeadline : userObj.users.userName}
      />
      <HeaderNav />
      <div className="container">
         <UserDetails userObj={userObj} />
      </div>
      <FooterNav />
    </div>
  );
}


export async function getServerSideProps(context) {
  // Fetch data from external API
  let data = {};
  const { userSlug } = context.query;
  // if (req.headers["user-agent"].match("Chrome")) {
  const res = await fetch(`https://www.paghd.com/v2/people/aboutNew.php?userSlug=${userSlug}`);
  data = await res.json();
  // }
  return { props: data };
} 

export default UserDetail;
