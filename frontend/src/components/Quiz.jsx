import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Quiz = () => {
  const { user } = useAuth();
  const [quizCount, setQuizCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [careerScores, setCareerScores] = useState({
    Engineering: 0,
    Medical: 0,
    Mathematics: 0,
    Agriculture: 0,
    Sports: 0,
    Government: 0,
  });
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      questionText: "What type of problem do you enjoy solving the most?",
      options: {
        Engineering: "Designing and building machines or structures",
        Medical: "Diagnosing and treating health issues",
        Mathematics: "Solving complex mathematical and logical problems",
        Agriculture: "Improving farming techniques and sustainability",
        Sports: "Training for physical performance and competition",
        Government: "Addressing social and administrative challenges",
      },
    },
    {
      questionText: "What kind of environment do you prefer to work in?",
      options: {
        Engineering: "Labs, offices, or construction sites",
        Medical: "Hospitals and healthcare facilities",
        Mathematics: "Research institutions or academic settings",
        Agriculture: "Farms, fields, or agricultural research centers",
        Sports: "Stadiums, training facilities, or outdoor spaces",
        Government: "Government offices or public service settings",
      },
    },
    {
      questionText: "How do you feel about working with people?",
      options: {
        Engineering: "I prefer working with machines, technology, or software",
        Medical: "I enjoy helping people directly with their health concerns",
        Mathematics: "I prefer working independently with numbers and theories",
        Agriculture: "I like working with nature and sustainable systems",
        Sports: "I enjoy teamwork, coaching, and competition",
        Government: "I like creating policies that positively impact society",
      },
    },
    {
      questionText: "Which subject interests you the most?",
      options: {
        Engineering: "Physics, technology, and design",
        Medical: "Biology, anatomy, and healthcare",
        Mathematics: "Mathematics, statistics, and data analysis",
        Agriculture: "Environmental science and agricultural studies",
        Sports: "Physical education, nutrition, and sports psychology",
        Government: "Political science, economics, and public policy",
      },
    },
    {
      questionText: "How much time are you willing to invest in education and training?",
      options: {
        Engineering: "4-5 years for a technical degree and ongoing learning",
        Medical: "7-10+ years for medical degrees and specialization",
        Mathematics: "4-8 years for advanced degrees and research",
        Agriculture: "2-6 years depending on specialization",
        Sports: "Continuous physical training and skill development",
        Government: "4-7 years including specialized public service preparation",
      },
    },
  ];

  useEffect(() => {
    if (user) {
      setQuizCount(user.quizCount || 0);
    }
  }, [user]);

  const handleSelectOption = (career) => {
    setSelectedOption(career);
  };

  const handleAnswer = async () => {
    if (selectedOption === null) return;
    
    setCareerScores((prevScores) => ({
      ...prevScores,
      [selectedOption]: prevScores[selectedOption] + 1,
    }));

    setAnswers([...answers, selectedOption]);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      // This is the last question, show results and update quiz count
      setShowResult(true);
      try {
        // Update quiz count on the server
        const response = await axios.put('http://localhost:5000/api/auth/update-quiz-count', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          setQuizCount(response.data.data.quizCount);
          setCompleted(true);
        }
      } catch (error) {
        console.error('Error updating quiz count:', error);
      }
    }
  };

  const getCareerRecommendation = () => {
    return Object.keys(careerScores).reduce((a, b) => (careerScores[a] > careerScores[b] ? a : b));
  };

  const getCareerDescription = (career) => {
    const descriptions = {
      Engineering: "Engineering careers involve designing, building, and maintaining structures, machines, systems, and processes. Engineers use science, mathematics, and creativity to solve technical problems.",
      Medical: "Medical professionals focus on preventing, diagnosing, and treating health conditions. This field offers various specializations from general practice to specialized surgery.",
      Mathematics: "Mathematics careers involve analyzing data, solving complex problems, and developing models. Mathematicians work in research, academia, finance, and technology sectors.",
      Agriculture: "Agricultural careers focus on food production, farming practices, and environmental sustainability. This field combines science, technology, and practical skills.",
      Sports: "Sports careers include athletic training, coaching, sports management, and physical therapy. These roles focus on physical performance, team development, and sports business.",
      Government: "Government careers involve public service, policy development, and administration. These roles focus on improving society through effective governance and public programs."
    };
    return descriptions[career] || "This career path offers numerous opportunities for growth and development.";
  };

  const getProgressPercentage = () => {
    return ((currentQuestion / questions.length) * 100).toFixed(0);
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Please log in to take the quiz.
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="container mt-5 fade-in">
        <div className="quiz-container">
          {showResult ? (
            <div className="result-section text-center">
              <div className="mb-4 mt-2">
                <span className="badge bg-success p-2 fs-6">Analysis Complete</span>
              </div>
              <h2 className="mb-4">Your Recommended Career Path</h2>
              
              <div className="card border-primary mb-4">
                <div className="card-body text-center">
                  <div className="display-4 mb-3 text-primary fw-bold">{getCareerRecommendation()}</div>
                  <p className="lead">{getCareerDescription(getCareerRecommendation())}</p>
                </div>
              </div>
              
              <div className="row mt-5">
                <div className="col-md-6 mx-auto">
                  <h4 className="mb-3">Other Career Matches</h4>
                  {Object.entries(careerScores)
                    .sort(([, a], [, b]) => b - a)
                    .slice(1, 4)
                    .map(([career, score], index) => (
                      <div key={career} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>{career}</span>
                          <span className="text-muted">{Math.round((score / questions.length) * 100)}% match</span>
                        </div>
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{
                              width: `${(score / questions.length) * 100}%`,
                              backgroundColor: index === 0 ? "#4361ee" : index === 1 ? "#3a0ca3" : "#7209b7"
                            }}
                            aria-valuenow={(score / questions.length) * 100}
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="mt-5">
                <Link to="/mentors" className="btn btn-primary me-3">
                  Find a Mentor
                </Link>
                <Link to="/career-higher" className="btn btn-outline-primary">
                  Explore Career Paths
                </Link>
              </div>

              <div className="mt-4">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setCareerScores({
                      Engineering: 0,
                      Medical: 0,
                      Mathematics: 0,
                      Agriculture: 0,
                      Sports: 0,
                      Government: 0,
                    });
                    setCompleted(false);
                    setShowResult(false);
                    setSelectedOption(null);
                  }}
                >
                  Take Another Quiz
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary p-2">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-muted">Progress: {getProgressPercentage()}%</span>
                </div>
                <div className="progress mt-2">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${getProgressPercentage()}%`}} 
                    aria-valuenow={getProgressPercentage()} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              
              <h3 className="mb-4 text-center">{questions[currentQuestion].questionText}</h3>
              
              <div className="options-container">
                {Object.entries(questions[currentQuestion].options).map(([career, text], index) => (
                  <div 
                    key={index}
                    className={`quiz-option ${selectedOption === career ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(career)}
                  >
                    <div className="d-flex align-items-center">
                      <div className={`option-selector me-3 ${selectedOption === career ? 'bg-white text-primary' : ''}`} 
                           style={{
                             width: "24px", 
                             height: "24px", 
                             borderRadius: "50%", 
                             border: selectedOption === career ? "none" : "2px solid #dee2e6",
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center",
                             fontSize: "14px",
                             fontWeight: "bold"
                           }}
                      >
                        {selectedOption === career && <i className="bi bi-check"></i>}
                      </div>
                      {text}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <button 
                  className="btn btn-primary px-4 py-2" 
                  onClick={handleAnswer}
                  disabled={selectedOption === null}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 fade-in">
      <div className="quiz-container">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-primary p-2">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-muted">Progress: {getProgressPercentage()}%</span>
          </div>
          <div className="progress mt-2">
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{width: `${getProgressPercentage()}%`}} 
              aria-valuenow={getProgressPercentage()} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        
        <h3 className="mb-4 text-center">{questions[currentQuestion].questionText}</h3>
        
        <div className="options-container">
          {Object.entries(questions[currentQuestion].options).map(([career, text], index) => (
            <div 
              key={index}
              className={`quiz-option ${selectedOption === career ? 'selected' : ''}`}
              onClick={() => handleSelectOption(career)}
            >
              <div className="d-flex align-items-center">
                <div className={`option-selector me-3 ${selectedOption === career ? 'bg-white text-primary' : ''}`} 
                     style={{
                       width: "24px", 
                       height: "24px", 
                       borderRadius: "50%", 
                       border: selectedOption === career ? "none" : "2px solid #dee2e6",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       fontSize: "14px",
                       fontWeight: "bold"
                     }}
                >
                  {selectedOption === career && <i className="bi bi-check"></i>}
                </div>
                {text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button 
            className="btn btn-primary px-4 py-2" 
            onClick={handleAnswer}
            disabled={selectedOption === null}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
