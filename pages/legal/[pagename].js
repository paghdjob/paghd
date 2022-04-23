import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import HeaderNav from "../../components/common/headerNav";
import FooterNav from "../../components/common/footerNav";
import { GetApi } from "../../components/webApi";
function PageName(props) {
  const [pageData, setPageData] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await GetApi(`/mockjson/cms-pages.json`);
      const result = res.filter((data) => data.id === router.query.pagename);
      result.length > 0 ? setPageData(result) : router.push("/");
    })();
  }, [props]);

  return (
    <div>
      <HeaderNav />
      <div className="container">
        {pageData && pageData[0] && pageData[0].text && (
          <div dangerouslySetInnerHTML={{ __html: pageData[0].text }} />
        )}
      </div>
      <FooterNav />
    </div>
  );
}

export default PageName;
