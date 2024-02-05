import style from "../style/linkedinPreview.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import { IconButton } from "@mui/material";
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";
const like = "/svgexport-14.svg";
const comment = "/svgexport-15.svg";
const repost = "/svgexport-16.svg";
const send = "/svgexport-17.svg";
const world = "/svgexport-54.svg";

const LinkedinPreview = ({ content }) => {
  let initialDisplayLines = 2;
  const [displayAll, setDisplayAll] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(1);
  const isMobile = useCheckMobileScreen();

  const fullName = useSelector((state) => state.User.fullName);

  const toggleDisplay = () => {
    setDisplayAll(!displayAll);
  };

  const changeDevice = (device) => {
    setSelectedDevice(device);
  };

  let contentLines = content.split("\n");

  if (content.length > 245 && contentLines.length === 1) {
    const truncatedContent =
      content.substring(0, 245) + "\n" + content.substring(245);
    contentLines = truncatedContent.split("\n");
    initialDisplayLines = 1;
  }

  const DeviceIcons = ({ id, icon }) => (
    <IconButton
      color={selectedDevice === id ? "primary" : "default"}
      size="small"
      onClick={() => changeDevice(id)}
    >
      {icon}
    </IconButton>
  );

  const BaseButtons = ({ alt, src, text }) => (
    <div>
      <img src={src} alt={alt} />
      <span className={style.iconX}>{text}</span>
    </div>
  );

  return (
    <div className={style.LinkdIn_Post}>
      <div className={style.Devices}>
        <p>Device: </p>
        <DeviceIcons id={1} icon={<PhoneIphoneIcon />} />
        {!isMobile && (
          <>
            <DeviceIcons id={2} icon={<TabletMacIcon />} />
            <DeviceIcons id={3} icon={<DesktopMacOutlinedIcon />} />
          </>
        )}
      </div>

      <div
        className={style.Container}
        style={
          selectedDevice === 1
            ? { width: 399 }
            : selectedDevice === 2
            ? { width: 493 }
            : { width: 540 }
        }
      >
        <div className={style.header}>
          <div className={style.headercontent}>
            <div>
              <div>
                <img src={require("../images/M.png")} alt="#" />
              </div>
              <div className={style.Following}>
                <p className={style.title}>
                  <span>{fullName}</span>
                  <span className={style.you}> • You</span>
                  <span className={style.muse}>Muse</span>
                  <span className={style.muse}>
                    9h •&nbsp;
                    <img src={world} alt="world" />
                  </span>
                </p>
              </div>
            </div>
            <svg
              role="none"
              className="artdeco-button__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              data-test-icon="thumbs-up-outline-medium"
            >
              <use href="#thumbs-up-outline-medium" width="24" height="24" />
            </svg>
          </div>
        </div>
        <div className={style.content}>
          {displayAll
            ? contentLines.map((line, index) => {
                return <p key={index}>{line}</p>;
              })
            : contentLines.slice(0, initialDisplayLines).map((line, index) => {
                return <p key={index}>{line}</p>;
              })}
          {(contentLines.length > initialDisplayLines ||
            content.length > 245) && (
            <p className={style.seemore} onClick={toggleDisplay}>
              {displayAll ? "See less" : "See more"}
            </p>
          )}

          {contentLines[0].length === 0 && <br />}
        </div>
        <div className={style.aboveHR}>
          <div>
            <img
              src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22"
              alt="#"
            />
            <span className={style.spanLikesNo}>6</span>
          </div>
          <div>
            <span className={style.spanLikesNo}>4 comments</span>
          </div>
        </div>
        <hr />
        <div className={style.footer}>
          <BaseButtons alt={"link"} src={like} text={"Like"} />
          <BaseButtons alt={"comment"} src={comment} text={"Comments"} />
          <BaseButtons alt={"repost"} src={repost} text={"Repost"} />
          <BaseButtons alt={"send"} src={send} text={"Send"} />
        </div>
      </div>
    </div>
  );
};

export default LinkedinPreview;
