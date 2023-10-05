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

  const handleSelectChange = (e) => {
    setSelectedQuestion(e.target.value);
  };

  const handleCreator = (e) => {
    setCreator(e.target.value);
  };

  const handleAnswerChange = (e) => {
    const answerInput = e.target.value;
    setNewAnswer(answerInput);
  };

  const handleAdd = () => {
    if (selectedQuestion && newAnswer !== "") {
      setSelectedAnswers([
        ...selectedAnswers,
        { question: selectedQuestion, answer: newAnswer },
      ]);
      setSelectedQuestion("");
      setNewAnswer("");
      setAvailableQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question !== selectedQuestion)
      );
    }
  };

  const submitData = async () => {
    try {
      if (creator && selectedAnswers.length > 0) {
        const userData = {
          creator,
          answers: selectedAnswers,
          selectedTone,
        };

        onPress();
        const response = await axios.post(
          "http://localhost:4000/userDetails",
          userData
        );

        if (response.data.message) {
          console.log("response.data.message", response.data.message);
          HandleGPTResponse(response.data.message);
        }
        // Handle the response here, if needed
        console.log("Data submitted successfully:", response.data);
      } else {
        // Handle validation or display an error message
        console.error("Invalid data for submission");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error submitting data:", error);
    }
  };
  const handleToneChange = (e) => {
    setSelectedTone(e.target.value);
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
        <select
          className="question-dropdown"
          value={selectedTone}
          onChange={handleToneChange}
        >
          <option value="">Select a tone</option>
          {Tone.map((tone, index) => {
            const objectHere = `${tone.style} - ${tone.description}`;
            return (
              <option key={index} value={objectHere}>
                {tone.style}
              </option>
            );
          })}
        </select>
      </div>

      <div className="question-container">
        <label>Select Questions (Atleast One)</label>
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
        {selectedQuestion && (
          <div className="selected-question">
            <p>Q: {selectedQuestion}</p>
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
        )}
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
