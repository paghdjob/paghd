import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const HeaderNav = dynamic(() => import("../../components/common/headerNav"));
const FooterNav = dynamic(() => import("../../components/common/footerNav"));

function PrivacyPolicy(props) {
  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="rows">
          <h1>About Us</h1>
        </div>
        <div className="rows">
          <p>
            paghd.com is an advanced hiring platform based on artificial
            intelligence, enabling recruiters to hire top talent effortlessly.
          </p>
          <p>
            Instead of having to waste hours on applying filters to search for
            the right candidates and then checking if they are interested,
            paghd.com provides the recruiter with a curated list candidates
            ready for hire from its premium database. This enables the recruiter
            to spend more time on providing a top candidate experience, while
            paghd.com does the heavy lifting of providing quality profiles.
          </p>
          <p>
            If you are looking for jobs, paghd.com connects you with curated
            opportunities based on your profile. No fake jobs, mass emails or
            spam like you’re used to on other platforms.
          </p>
          <p>
            Trusted by more than 1,00,000 of World Largest companies, including
            Amazon, Uber, Myntra, Target and Paytm.
          </p>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default PrivacyPolicy;
