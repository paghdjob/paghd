import React, { useEffect, useState } from "react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <button
      className="btn link-info float-end"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
<<<<<<< HEAD
      Install Lite App at Paghd Jobs
=======
      Click here to install Lite App
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
    </button>
  );
};

export default InstallPWA;
