import React, { useState, useEffect } from "react";
import { Questions as allQuestions, Tone } from "./Question";
import "../style/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePoint } from "../slices/SubscriptionSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Main({ onPress, HandleGPTResponse }) {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [availableQuestions, setAvailableQuestions] = useState(allQuestions);
  const [selectedTone, setSelectedTone] = useState("");
  const [description, setDescription] = useState("");
  const [isOtherToneSelected, setIsOtherToneSelected] = useState(false);
  const [customTone, setCustomTone] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [textArea, setTextArea] = useState("");
  const [textAreaContents, setTextAreaContents] = useState([]);
  const [questionAccordions, setQuestionAccordions] = useState([]);
  const [textareaAccordions, setTextareaAccordions] = useState([]);

  const { email } = useSelector((state) => state.User);
  const { currentUserId } = useSelector((state) => state.Auth);
  const { points } = useSelector((state) => state.Subscription);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateHome = () => {
    navigate("/");
    Swal.fire({
      title: "Out of Credits. Upgrade your plan to Muse",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const addTextArea = () => {
    if (textArea) {
      setTextAreaContents([
        ...textAreaContents,
        { content: textArea, isOpen: false },
      ]);
      setTextArea("");
    }
  };

  const toggleQuestionAccordion = (index) => {
    const updatedQuestionAccordions = [...questionAccordions];
    updatedQuestionAccordions[index] = !updatedQuestionAccordions[index];
    setQuestionAccordions(updatedQuestionAccordions);
  };

  const toggleTextareaAccordion = (index) => {
    const updatedTextareaAccordions = [...textareaAccordions];
    updatedTextareaAccordions[index] = !updatedTextareaAccordions[index];
    setTextareaAccordions(updatedTextareaAccordions);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedQuestion(selectedValue);

    if (selectedValue === "Other") {
      if (newAnswer !== "") {
        setSelectedAnswers((prevAnswers) => [
          ...prevAnswers,
          { question: customQuestion, answer: newAnswer },
        ]);
        setCustomQuestion("");
        setNewAnswer("");
      }
    }
  };

  const handleCustomChange = (e) => {
    setCustomQuestion(e.target.value);
  };

  const handleToneChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Other") {
      setIsOtherToneSelected(true);
    } else {
      setIsOtherToneSelected(false);
      setSelectedTone(selectedValue);
    }
  };

  const handleCustomToneChange = (event) => {
    setCustomTone(event.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAnswerChange = (e) => {
    const answerInput = e.target.value;
    setNewAnswer(answerInput);
  };

  const handleAdd = () => {
    if (newAnswer !== "") {
      let newSelectedAnswers = [...selectedAnswers];
      if (selectedQuestion === "Other") {
        newSelectedAnswers = [
          ...newSelectedAnswers,
          { question: customQuestion, answer: newAnswer },
        ];
      } else if (selectedQuestion) {
        newSelectedAnswers = [
          ...newSelectedAnswers,
          { question: selectedQuestion, answer: newAnswer },
        ];
        setAvailableQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question !== selectedQuestion)
        );
      }

      setSelectedAnswers(newSelectedAnswers);
      setSelectedQuestion("");
      setNewAnswer("");
      setCustomQuestion("");
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        description,
        answers: selectedAnswers,
        selectedTone: isOtherToneSelected ? customTone : selectedTone,
        textAreaContents,
        email,
        teamId: currentUserId !== email ? currentUserId : null,
      };

      if (!userData.description || !userData.selectedTone) {
        toast.error("Please fill required fields !", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      onPress();

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chatGpt`,
        userData
      );

      if (response.data.message) {
        localStorage.setItem("response", response.data.message.content);
        HandleGPTResponse(response.data.message.content, userData.description);

        currentUserId === email && dispatch(deletePoint());
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    setSelectedQuestion("");
  }, [availableQuestions]);

  return (
    <Container className="PostGenContaier">
      <div className="container">
        <div className="heading">
          <h1 className="bold-text" style={{ textAlign: "left" }}>
            Linkedin Post Generator
          </h1>
          <p style={{ textAlign: "left" }}>
            Our database of top-performing LinkedIn posts allows us to genearte{" "}
            <br />
            captivating, engaging and converting Linkedin content, in seconds
          </p>
        </div>

        <div className="creator-content">
          <label>
            Enter a description <span className="Required">*</span>
          </label>
          <textArea
            className="MainDesc"
            type="text"
            placeholder="What should the Post be about..."
            value={description}
            onChange={handleDescription}
          />
        </div>

        <div className="question-container">
          <label>
            Tone <span className="Required">*</span>
          </label>
          {isOtherToneSelected ? (
            <input
              className="creator-input"
              type="text"
              placeholder="Enter Your Tone"
              value={customTone}
              onChange={handleCustomToneChange}
            />
          ) : (
            <select
              className="question-dropdown"
              value={selectedTone}
              onChange={handleToneChange}
            >
              <option value="">Select a tone</option>
              {Tone.map((tone, index) => (
                <option key={index} value={tone.style}>
                  {tone.style}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          )}
        </div>

        <div className="question-container">
          <label>Use these questions as post inspiration (Optional)</label>
          <select
            className="question-dropdown"
            value={selectedQuestion}
            onChange={handleSelectChange}
          >
            <option value="">Select a question</option>
            {availableQuestions.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </select>
          {selectedQuestion === "Other" ? (
            <div className="selected-question">
              <input
                className="creator-input QCR"
                type="text"
                placeholder="Question: Add Your Question Here.."
                value={customQuestion}
                onChange={handleCustomChange}
              />
              <div className="input-button-container">
                <input
                  className="answer-input"
                  placeholder="Answer Here..."
                  value={newAnswer}
                  onChange={handleAnswerChange}
                />
                <button className="add-button" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </div>
          ) : selectedQuestion ? (
            <div className="selected-question">
              <p>Q {selectedQuestion}</p>
              <div className="input-button-container">
                <input
                  className="answer-input"
                  placeholder="Answer Here..."
                  value={newAnswer}
                  onChange={handleAnswerChange}
                />
                <button className="add-button" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="question-container textarea-container">
          <label>Inspiration Post (Optional)</label>
          <textarea
            className="creator-input"
            placeholder="Paste post(s) here for inspiration"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          <button
            className="add-button"
            onClick={addTextArea}
            style={{
              marginBottom: "40px",
            }}
          >
            Add
          </button>
          <div className="accordion-container">
            {textAreaContents.length >= 1 && (
              <p className="title">Inspiration posts</p>
            )}

            {textAreaContents.map((content, index) => (
              <div key={index} className="accordion-item">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => toggleTextareaAccordion(index)}
                >
                  Show Inspiration Post {index + 1}
                </button>
                <div
                  className={`custom-accordion-content ${
                    textareaAccordions[index] ? "active" : ""
                  }`}
                >
                  {content.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="selected-question">
          <div className="selected-question-container">
            {selectedAnswers.length >= 1 && (
              <p className="title">Selected Questions</p>
            )}
            <ul className="accordion">
              {selectedAnswers.map((item, index) => (
                <li key={index} className="q-content">
                  <button
                    className={`accordion-button ${
                      questionAccordions[index] ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => toggleQuestionAccordion(index)}
                  >
                    Q: {item.question}
                  </button>
                  <div
                    className={`answer-content ${
                      questionAccordions[index] ? "show" : ""
                    }`}
                  >
                    Ans: {item.answer}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {points > 0 || currentUserId !== email ? (
        <div className="PostSubmit">
          <button
            className="submit-button"
            onClick={submitData}
            style={{ position: "relative" }}
          >
            MUSE
            <FaPencilAlt className="Pencil" />
          </button>
        </div>
      ) : (
        <div className="PostSubmit">
          <ScrollLink
            to="pricing"
            spy={true}
            smooth={true}
            duration={80}
            offset={30}
            style={{ textDecoration: "none", color: "white" }}
            className="FormLinks"
          >
            <button
              className="submit-button"
              onClick={navigateHome}
              style={{ position: "relative" }}
            >
              MUSE
              <FaPencilAlt className="Pencil" />
            </button>
          </ScrollLink>
        </div>
      )}
    </Container>
  );
}

export default Main;
