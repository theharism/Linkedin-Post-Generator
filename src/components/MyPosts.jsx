import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import axios from "axios";

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

  const RenderPost = ({ summary, content }) => {
    return (
      <div>
        <Accordion>
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
        </Accordion>
      </div>
    );
  };

  return (
    <Container className="PostGenContaier">
      <div className="container">
        <div className="heading">
          <h1 className="bold-text">Saved Posts</h1>
        </div>
        {posts.map((item, index) => (
          <RenderPost key={index} summary="Accordion" content={item.content} />
        ))}
      </div>
    </Container>
  );
};

export default MyPosts;
