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

  return (
    <div className={style.LinkdIn_Post}>
      <div className={style.Devices}>
        <p>Device: </p>
        <IconButton
          color={selectedDevice === 1 ? "primary" : "default"}
          size="small"
          onClick={() => changeDevice(1)}
        >
          <PhoneIphoneIcon />
        </IconButton>
        {!isMobile && (
          <>
            <IconButton
              color={selectedDevice === 2 ? "primary" : "default"}
              size="small"
              onClick={() => changeDevice(2)}
            >
              <TabletMacIcon />
            </IconButton>
            <IconButton
              color={selectedDevice === 3 ? "primary" : "default"}
              size="small"
              onClick={() => changeDevice(3)}
            >
              <DesktopMacOutlinedIcon />
            </IconButton>
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
                  {/* <br /> */}
                  <span className={style.muse}>Muse</span>
                  {/* <br /> */}
                  <span className={style.muse}>
                    9h •&nbsp;
                    <img src={world} alt="world" />
                  </span>
                </p>
              </div>
            </div>
            <svg
              role="none"
              aria-hidden="true"
              className="artdeco-button__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              data-test-icon="thumbs-up-outline-medium"
            >
              <use
                href="#thumbs-up-outline-medium"
                width="24"
                height="24"
              ></use>
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
          <div>
            <img src={like} alt="like" />
            <span className={style.iconX}>Like</span>
          </div>
          <div>
            <img src={comment} alt="comment" />
            <span className={style.iconX}>Comments</span>
          </div>
          <div>
            <img src={repost} alt="repost" />
            <span className={style.iconX}>Repost</span>
          </div>
          <div>
            <img src={send} alt="send" />
            <span className={style.iconX}>Send</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedinPreview;
