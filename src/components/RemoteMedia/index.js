import React, { useRef, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { createRemoteMediaSelector } from "./selectors";
import "./RemoteMedia.css";

const RemoteMedia = function () {
  const videoRef = useRef();
  const remoteMedia = useSelector(createRemoteMediaSelector());
  useEffect(() => {
    videoRef.current.srcObject = remoteMedia.stream;
  }, [remoteMedia, remoteMedia.stream]);

  return (
    <div className="RemoteMedia">
      <video ref={videoRef} className="RemoteMedia-video" autoPlay playsInline />
    </div>
  );
};

export default memo(RemoteMedia);
