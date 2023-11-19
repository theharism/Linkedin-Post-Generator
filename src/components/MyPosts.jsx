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
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import GeneratePost from "./GeneratePost";

const MyPosts = () => {
  const username = useSelector((state) => state.User.username);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const endpointURL = `${process.env.REACT_APP_BASE_URL}/api/getposts/${username}`;

      axios
        .get(endpointURL)
        .then((response) => {
          console.log("Posts:", response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const RenderPost = ({ index, summary, content, time }) => {
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
                justifyContent: "space-between", // Adjust this property
                alignItems: "center", // Center vertically if needed
                width: "100%", // Ensure the content takes up the full width
              }}
            >
              <Typography sx={{ fontFamily: "inherit" }}>{summary}</Typography>
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

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{summary}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{content}</Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Container className="PostGenContaier">
        <div className="container">
          <div className="heading">
            <h1 className="bold-text">Saved Posts</h1>
          </div>
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <RenderPost
                index={index}
                summary={item.question}
                content={item.content}
                time={item.createdAt}
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
