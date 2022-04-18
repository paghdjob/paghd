import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const HeaderNav = dynamic(() => import("../../components/common/headerNav"));
const FooterNav = dynamic(() => import("../../components/common/footerNav"));
const ProfileInfo = dynamic(() =>
  import("../../components/about/profile/peopleInfo")
);
const PeoplePrivate = dynamic(() =>
  import("../../components/about/profile/peoplePrivate")
);
const PeopleProfile = dynamic(() =>
  import("../../components/about/profile/peopleProfile")
);
const PeopleExperienceNew = dynamic(() =>
  import("../../components/about/profile/peopleExperienceNew")
);
const PeopleWorkType = dynamic(() =>
  import("../../components/about/profile/peopleWorkType")
);
const PeopleLanguage = dynamic(() =>
  import("../../components/about/profile/peopleLanguage")
);
const PeopleSkill = dynamic(() =>
  import("../../components/about/profile/peopleSkill")
);
const PeopleIndustry = dynamic(() =>
  import("../../components/about/profile/peopleIndustry")
);
const ProfileResume = dynamic(() =>
  import("../../components/about/profile/peopleResume")
);

import { GetApi } from "../../components/webApi";

function About(props) {
  const [userObj, setUserObj] = useState(props);
  const router = useRouter();

  useEffect(async () => {
    const cookies = new Cookies();
    if (!cookies.get("userID")) {
      router.push("/login");
    }
    const res = await GetApi("/v2/people/about.php?userSlug="+ cookies.get("userID"))
    setUserObj(res);
  }, [props]);

  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="row m-0 p-0">
          <h1>Profile / Resume</h1>
          <div className="float-end">
            {userObj.users && (
              <Link href={`/about/${userObj.users.userSlug}`}>
                <a className="float-end btn btn-info">Preview Resume</a>
              </Link>
            )}
          </div>
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
