import React from "react";
import "../style/Card.css";
import { Container } from "react-bootstrap";
function Card() {
  // Dummy data for the cards
  const dummyCards = [
    {
      title: "1",
      description: "Set the scene",
      use: "Give us some context as to what you'd like your post to talk about. Remember, the more detail you include, the more accurate and personalized your post will be.",
    },
    {
      title: "2",
      description: "Set Your Tone",
      use: "Choose from a range of moods such as happy, sad, angry, and more, to infuse your post with the desired emotional tone.",
    },
    {
      title: "3",
      description: "Customize Your Content",
      use: "Select from a curated list of 51 thought-provoking questions to help tailor your post content for maximum accuracy and engagement.",
    },
    {
      title: "4",
      description: "Generate Your Post",
      use: "With a click of the submit button, watch as our intelligent algorithm crafts a compelling LinkedIn post that reflects your chosen mood and style, ready to be shared with your network.",
    },
  ];

  return (
    <Container className="C_Card">
      <div className="Cardcontainer">
        <div className="center-content">
          <div className="heading-div">
            <h1 className="text-bold">How to use Muse</h1>
          </div>
          <div className="card-div">
            <div className="row">
              {dummyCards.map((card, index) => (
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4 " key={index}>
                  <div className="card rounded-circle-card text-center boxCard"
                  style={{
                    boxShadow:"white 0px 2px 7px",
                    backgroundColor:"white"
                  }}
                  >
                    <div className="card-body boxCard">
                      <h5 className="card-title">{card.title}</h5>
                      <span className="card-text des d-block m-3">
                        {card.description}
                      </span>
                      <p className="card-text textde">{card.use}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Card;
