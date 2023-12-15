import style from "../style/linkedinPreview.module.css";
import React, { useState } from "react";
import { SlLike } from "react-icons/sl";
import { FaRegComments } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { RiRepeatLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import { IconButton } from "@mui/material";

function Fahad({ content }) {
  const initialDisplayLines = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  const [displayAll, setDisplayAll] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(1);

  const fullName = useSelector((state) => state.User.fullName);

  const toggleDisplay = () => {
    setDisplayAll(!displayAll);
  };

  const changeDevice = (device) => {
    setSelectedDevice(device);
  };

  const contentLines = content.split("\n");

  const sanitizedHTML = { __html: content };

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
              <img src={require("../images/M.png")} alt="#" />
            </div>
            <div className={style.Following}>
              <p>
                <span>{fullName}</span> . <span>You</span>
                <br />
                <span>???</span>
              </p>
            </div>
          </div>
        </div>
        <div className={style.content}>
          {/* {displayAll
            ? contentLines.map((line, index) => <p key={index}>{line}</p>)
            : contentLines
                .slice(0, initialDisplayLines)
                .map((line, index) => <p key={index}>{line}</p>)}
          {contentLines.length > initialDisplayLines && (
            <p className={style.seemore} onClick={toggleDisplay}>
              {displayAll ? "" : "See more"}
            </p>
          )} */}
          <div dangerouslySetInnerHTML={sanitizedHTML} />
          {contentLines[0].length === 0 && <br />}
        </div>
        <hr />
        <div className={style.footer}>
          <div>
            <SlLike />
            <span>Like</span>
          </div>
          <div>
            <FaRegComments />
            <span>Comments</span>
          </div>
          <div>
            <RiRepeatLine />
            <span>Repost</span>
          </div>
          <div>
            <LuSend />
            <span>Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fahad;
