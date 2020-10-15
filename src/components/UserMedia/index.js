import React, { useRef, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { createUserMediaSelector } from "./selectors";
import "./UserMedia.css";

const UserMedia = function () {
  const videoRef = useRef();
  const userMedia = useSelector(createUserMediaSelector());
  useEffect(() => {
    videoRef.current.srcObject = userMedia.stream;
  }, [userMedia, userMedia.hasStream, userMedia.stream]);

  return (
    <div className="UserMedia">
      <video ref={videoRef} className="UserMedia-video" autoPlay playsInline muted />
    </div>
  );
};

export default memo(UserMedia);
