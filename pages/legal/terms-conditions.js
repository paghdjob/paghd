import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
const HeaderNav = dynamic(() => import('../../components/common/headerNav'))
const FooterNav = dynamic(() => import('../../components/common/footerNav'))
 
function TermsConditions(props) {
  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="rows">
        <h1>Terms & Conditions</h1>
        </div>
        <div className="rows">
            <h2>Your Privacy Matters</h2>
            <p>
              job portal mission is to connect the world’s professionals to allow them to be more productive and
              successful.
              Central to this mission is our commitment to be transparent about the data we collect about you, how it is
              used and with whom it is shared.
            </p>
          </div>
          <div className="rows">
            <h5>Profile</h5>
            <p>
              Our registered users (“Members”) share their professional identities, engage with their network, exchange
              knowledge and professional insights, post and view relevant content, learn and find business and career
              opportunities. Content and data on some of our Services is viewable to non-members (“Visitors”).
            </p>
          </div>
          <div className="rows">
            <h5>Introduction</h5>
            <p>
              You have choices about the information on your profile, such as your education, work experience, skills,
              photo, city or area and endorsements. Some Members may choose to complete a separate ProFinder profile.
              You
              don’t have to provide additional information on your profile; however, profile information helps you to
              get
              more from our Services, including helping recruiters and business opportunities find you.
              It’s your choice whether to include sensitive information on your profile and to make that sensitive
              information public. Please do not post or add personal data to your profile that you would not want to be
              publicly available.
            </p>
          </div>
          <div className="rows">
            <h5>Partners</h5>
            <p>
              We receive personal data about you when you use the services of our customers and partners, such as
              employers, prospective employers and applicant tracking systems providing us job application data.
            </p>
          </div>
          <div className="rows">
            <h5>Messages</h5>
            <p>
              We collect information about you when you send, receive, or engage with messages in connection with our
              Services.
            </p>
          </div>
          <div className="rows">
            <h5>permission</h5>
            <p>
              We currently do not share personal data with third parties for their direct marketing purposes without
              your
              permission.

            </p>
          </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default TermsConditions;
