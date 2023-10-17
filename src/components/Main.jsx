import React, { useState, useEffect } from "react";
import { Questions as allQuestions, Tone } from "./Question";
import "../style/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const submitData = async () => {
    try {
      const userData = {
        description,
        answers: selectedAnswers,
        selectedTone: isOtherToneSelected ? customTone : selectedTone,
        textAreaContents,
      };

      if (!userData.description || !userData.selectedTone) {
        toast.error("Please fill required fields !", {
          position: "top-right",
          autoClose: 1500, 
        });
        return; 
      }

      console.log(userData);

      onPress();

      const response = await axios.post(
        "http://localhost:3000/api/chatGpt",
        userData
      );


      if (response.data.message) {
        HandleGPTResponse(response.data.message.content);
        console.log("Prompt" , response.data.prompt);
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
          <h1 className="bold-text">Linkedin Post Generator</h1>
          <p>
            Generate Post quickly and easily with our new AI Post Generator.
          </p>
        </div>

        <div className="creator-content">
          <label>
            Enter a description <span className="Required">*</span>
          </label>
          <input
            className="MainDesc"
            type="text"
            placeholder="What should the Post be about..."
            value={description}
            onChange={handleDescription}
          />
        </div>

        <div className="question-container">
          <label>Select Questions (Optional)</label>
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

        <div className="question-container textarea-container">
          <label>Inspirational Post (Optional)</label>
          <textarea
            className="creator-input"
            placeholder="Enter any inspirational posts..."
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
              <p className="title">Inspirational posts</p>
            )}

            {textAreaContents.map((content, index) => (
              <div key={index} className="accordion-item">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => toggleTextareaAccordion(index)}
                >
                  Show Inspirational Post {index + 1}
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
    </Container>
  );
}

export default Main;
