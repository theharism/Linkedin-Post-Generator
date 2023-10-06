import React, { useState, useEffect } from "react";
import { Questions as allQuestions, Tone } from "./Question";
import "../style/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Main({ onPress, HandleGPTResponse }) {
  const [creator, setCreator] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [availableQuestions, setAvailableQuestions] = useState(allQuestions);
  const [selectedTone, setSelectedTone] = useState("");
  const [description, setDescription] = useState("");
  const [isOtherToneSelected, setIsOtherToneSelected] = useState(false);
  const [customTone, setCustomTone] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedQuestion(selectedValue);

    if (selectedValue === "Other") {
      // Automatically add the custom question to the accordion
      if (newAnswer !== "") {
        setSelectedAnswers((prevAnswers) => [
          ...prevAnswers,
          { question: customQuestion, answer: newAnswer },
        ]);
        setCustomQuestion(""); // Clear custom question field
        setNewAnswer(""); // Clear answer field
      }
    }
  };

  const handleCustomChange = (e) => {
    setCustomQuestion(e.target.value);
  };

  const handleCreator = (e) => {
    setCreator(e.target.value);
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
        // If "Other" is selected, add the custom question and answer
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
      // Clear custom question field as well
      setCustomQuestion("");
    }
  };

  const submitData = async () => {
    try {
      if (creator && selectedAnswers.length > 0) {
        const userData = {
          creator,
          answers: selectedAnswers,
          selectedTone: isOtherToneSelected ? customTone : selectedTone,
          description,
        };

        console.log("final user detals, ", userData);
        onPress();
        const response = await axios.post(
          "https://muse-backend.vercel.app/userDetails",
          userData
        );

        if (response.data.message) {
          console.log(
            "Response message from the backend:",
            response.data.message.content
          );
          HandleGPTResponse(response.data.message.content);
        }

        // Log the entire response data received from the backend
        console.log("Data received from the backend:", response.data);
      } else {
        console.error("Invalid data for submission");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    setSelectedQuestion("");
  }, [availableQuestions]);

  const toggleAccordion = (index) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index].isOpen = !updatedAnswers[index].isOpen;
      return updatedAnswers;
    });
  };

  return (
    <div className="container">
      <div className="heading">
        <h1 className="bold-text">Linkedin Post Generator</h1>
        <p>Generate Post quickly and easily with our new AI Post Generator.</p>
      </div>

      <div className="creator-content">
        <label>Enter a description*</label>
        <input
          className="MainDesc"
          type="text"
          placeholder="What should the Post be about..."
          value={description}
          onChange={handleDescription}
        />
      </div>

      <div className="creator-content">
        <label>Linkedin Creator's Profile URL *</label>
        <input
          className="creator-input"
          type="text"
          placeholder="Profile URL..."
          value={creator}
          onChange={handleCreator}
        />
      </div>
      <div className="question-container">
        <label>Tone *</label>
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

      <div className="selected-question">
        <button className="submit-button" onClick={submitData}>
          Submit
        </button>
        <div className="selected-question-container">
          {selectedAnswers.length >= 1 && (
            <p className="title">Selected Questions</p>
          )}
          <ul className="accordion">
            {selectedAnswers.map((item, index) => (
              <li key={index} className="q-content">
                <button
                  className={`accordion-button ${item.isOpen ? "active" : ""}`}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                >
                  Q: {item.question}
                </button>
                <div className={`answer-content ${item.isOpen ? "show" : ""}`}>
                  Ans: {item.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
