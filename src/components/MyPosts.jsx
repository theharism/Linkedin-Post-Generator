import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Footer from "../common/Footer";
import "../style/MyPosts.css";
import GeneratePost from "./GeneratePost";
import ReactSearchBox from "react-search-box";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { username } = useSelector((state) => state.User);
  const { currentUserId, currentUsername } = useSelector((state) => state.Auth);
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const isAdmin = useSelector((state) =>
    state.Teams.some((team) => team.isAdmin && team.team._id === currentUserId)
  );

  useEffect(() => {
    const endpointURL = `${process.env.REACT_APP_BASE_URL}/api/getposts/${
      username === currentUsername ? username : currentUserId
    }`;

    axios
      .get(endpointURL)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error getting posts:", error);
        Swal.fire({
          title: "Internal Server Error",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, [currentUserId, currentUsername, username]);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const RenderPost = ({
    index,
    summary,
    content,
    time,
    createdBy,
    isShared,
  }) => {
    const date = new Date(time);

    return (
      <div>
        <Accordion
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "60%",
                }}
              >
                <Typography sx={{ fontFamily: "inherit" }}>
                  {summary}
                </Typography>
                {isAdmin && (
                  <>
                    <Typography sx={{ fontFamily: "inherit", fontSize: 14 }}>
                      {createdBy}
                    </Typography>

                    <Typography
                      sx={{ fontFamily: "inherit", fontSize: 14, color: "red" }}
                    >
                      {isShared ? "Shared on LinkedIn" : null}
                    </Typography>
                  </>
                )}
              </div>
              <Typography sx={{ fontFamily: "inherit" }}>
                {date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="responseText"
              sx={{ fontFamily: "inherit", textAlign: "justify" }}
            >
              {content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Container className="PostGenContaier">
        <div style={{ position: "absolute", right: 30 }}>
          <ReactSearchBox
            placeholder="Search"
            data={posts}
            onChange={(text) => setSearchInput(text)}
            leftIcon={<SearchIcon sx={{ color: "#787878" }} />}
          />
        </div>
        <div className="container">
          <div className="heading">
            <h1 className="bold-text">Saved Posts</h1>
          </div>
          {posts.length > 0 ? (
            posts
              .filter((item) => {
                const summaryMatch = item.question
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
                const contentMatch = item.content
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
                const createdByMatch = item.teamId
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());

                return summaryMatch || contentMatch || createdByMatch;
              })
              .map((item, index) => (
                <RenderPost
                  key={index}
                  index={index}
                  summary={`${item.question
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")} ....`}
                  content={item.content}
                  time={item.createdAt}
                  createdBy={item?.teamId}
                  isShared={item?.isShared}
                />
              ))
          ) : (
            <GeneratePost />
          )}
        </div>
      </Container>
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default MyPosts;
