import React, { useRef, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userMuteToggled, userVideoToggled } from "./actions";
import { createUserMediaSelector } from "./selectors";
import "./UserMedia.css";

const UserMedia = function () {
  const videoRef = useRef();
  const userMedia = useSelector(createUserMediaSelector());
  const dispatch = useDispatch();

  useEffect(() => {
    videoRef.current.srcObject = userMedia.stream;
  }, [userMedia, userMedia.hasStream, userMedia.stream]);

  return (
    <div className="UserMedia">
      <video ref={videoRef} className="UserMedia-video" autoPlay playsInline muted />
      <button onClick={() => dispatch(userMuteToggled())}>Mute</button>
      <button onClick={() => dispatch(userVideoToggled())}>Video ON/OFF</button>
    </div>
  );
};

export default memo(UserMedia);
