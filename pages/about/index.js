import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import ProfileInfo from "../../components/about/profile/peopleInfo";
import PeoplePrivate from "../../components/about/profile/peoplePrivate";
import PeopleProfile from "../../components/about/profile/peopleProfile";
import PeopleExperienceNew from "../../components/about/profile/peopleExperienceNew";
import PeopleWorkType from "../../components/about/profile/peopleWorkType";
import PeopleLanguage from "../../components/about/profile/peopleLanguage";
import PeopleSkill from "../../components/about/profile/peopleSkill";
import PeopleIndustry from "../../components/about/profile/peopleIndustry";
import ProfileResume from "../../components/about/profile/peopleResume";
import Cookies from "universal-cookie";

function About(props) {
  const [userObj, setUserObj] = useState(props);

  useEffect(() => {
    const cookies = new Cookies();
    const auth = cookies.get("auth");
    fetch("/v2/people/about.php?userSlug=" + cookies.get("userID"), {
      method: "GET",
      headers: {
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("user result--", result);
          setUserObj(result);
        },
        (error) => {
          console.log("user error--", error);
        }
      );
  }, [props]);

  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="row m-0 p-0">
          <h1>Profile</h1>
        </div>

        {userObj.users && (
          <>
            <ProfileResume />
            <PeopleProfile
              userInfo={userObj.users}
              userID={userObj.users.userID}
            />
            <PeoplePrivate
              userInfo={userObj.userPrivate}
              userID={userObj.users.userID}
            />
            <ProfileInfo userInfo={userObj.userInfo} />
            <PeopleExperienceNew
              userExp={userObj.userExp}
              userID={userObj.users.userID}
            />
            <PeopleIndustry industry={userObj.userIndustry} />
            <PeopleSkill skill={userObj.userSkill} />
            <PeopleLanguage languages={userObj.userLanguages} />
            <PeopleWorkType workType={userObj.userWorkType} />
          </>
        )}
      </div>
      <FooterNav />
    </div>
  );
}

export default About;
