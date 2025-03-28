import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';
import Communication from './communcation';

const API_BASE_URL = 'http://localhost:5000';


const Quiz = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [correctAnswer,setCorrectAnswer] = useState(null)
  // Fetch total questions from backend

  // useEffect(()=>{
  //   socket.on("")
  //   // socket which will handle receiving the data 

  //   // and we have to close the connection ..
  // },[])
  useEffect(() => {
    const fetchTotalQuestions = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}/api`);
        console.log(result.data)
        // const result = await fetch(API_BASE_URL)
        // console.log(result)
        // const r = await result.json();
        // console.log(r)
        setTotalQuestion(result.data.totalQuestion);
      } catch (err) {
        console.error('Failed to fetch total questions:', err);
      }
    };

    fetchTotalQuestions();
  }, []);

  // Fetch question from backend
  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token')

        const response = await axios.get(`${API_BASE_URL}/api/questions/${currentQuestionId}`,{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });

        setCurrentQuestion(response.data);
        setSelectedOption(null);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load question');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [currentQuestionId]);

  const handleAnswerOptionClick = async (optionIndex) => {
    setSelectedOption(optionIndex);
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(`${API_BASE_URL}/api/verify-answer`, {
        questionId: currentQuestionId,
        selectedOption: optionIndex
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
      // await fetch(URL,{
      //   headers:{
      //     //setting up the headers
      //   },
      //   body:{
      //     // data 
      //   }
      // })

      setCorrectAnswer(response.data)
      if (response.data.isCorrect) {
        setScore(prevScore => prevScore + 1);

      }
    } catch (err) {
      console.error('Error verifying answer:', err);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionId === totalQuestion) {
      setShowScore(true);
    } else {
      setCurrentQuestionId(prevId => prevId + 1);
      setSelectedOption(null);
    }
  };

  if (isLoading) {
    return <div className="quiz-container">Loading question...</div>;
  }

  if (error) {
    return <div className="quiz-container">Error: {error}</div>;
  }

  if (!currentQuestion) {
    return <div className="quiz-container">No questions available</div>;
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {totalQuestion}</p>
          <Communication/>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionId} / {totalQuestion}</span>
            </div>
            <div className="question-text">
              {currentQuestion.question}
            </div>
          </div>
          <div className="answer-section">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOption === index ? "selected" : ""
                } ${
                  selectedOption !== null && 
                  index === correctAnswer?.correctAnswer 
                    ? "correct" 
                    : ""
                }`}
                onClick={() => handleAnswerOptionClick(index)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation">
            <button 
              className="next-button" 
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestionId === totalQuestion ? "Finish" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
