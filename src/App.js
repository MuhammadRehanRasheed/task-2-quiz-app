import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function QuizResults({ QuestionStatement, A, B, C, D, selectedAnswer, onAnswerSelect }) {
  return (
    <div>
      <div className="container-fluid mt-3 p-4 border border-secondary border-3 rounded-3">
        <h2 className="ms-5">{QuestionStatement}</h2>
      </div>
      {[A, B, C, D].map((option, index) => (
        <div 
          key={index} 
          className={`container-fluid mt-3 p-3 border border-secondary border-3 rounded-3 ${selectedAnswer === option ? 'bg-info text-white' : ''}`} 
          onClick={() => onAnswerSelect(option)}
        >
          <h2 className="ms-5">{option}</h2>
        </div>
      ))}
    </div>
  );
}

function QuizSummary({ questions, userAnswers }) {
  return (
    <div>
      <h2 className="text-center mt-5">Quiz Summary</h2>
      {questions.map((question, index) => (
        <div key={index} className="container-fluid mt-3 p-4 border border-secondary border-3 rounded-3">
          <h3>{question.QuestionStatement}</h3>
          <p><strong>Your Answer:</strong> {userAnswers[index] || 'No answer selected'}</p>
          <p><strong>Correct Answer:</strong> {question.ans}</p>
          <p>{userAnswers[index] === question.ans ? '✅ Correct' : '❌ Incorrect'}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [questions] = useState([
    {
      QuestionStatement: "1. Which of the following is a software development methodology focused on iterative progress through small, manageable sprints?",
      A: 'A) Waterfall',
      B: 'B) Agile',
      C: 'C) V-Model',
      D: 'D) Prototyping',
      ans: 'B) Agile',
    },
    {
      QuestionStatement: "2. In software design, what is the purpose of using Design Patterns?",
      A: 'A) To avoid writing code',
      B: 'B) To solve common design problems in a reusable way',
      C: 'C) To define the hardware requirements',
      D: 'D) To replace documentation',
      ans: 'B) To solve common design problems in a reusable way',
    },
    {
      QuestionStatement: "3. Which model emphasizes the separation of concerns by dividing software into presentation, business logic, and data access layers?",
      A:'A) Waterfall Model',
      B:'B) Agile Model',
      C:'C) MVC Model',
      D:'D) RAD Model',
      userinput:'',
      ans:'Answer: C) MVC Model', 
    },
    {
      QuestionStatement: "4. Which software development life cycle model is best suited for projects with well-defined requirements and minimal expected changes?",
      A:'A) Waterfall Model',
      B:'B) Spiral Model',
      C:'C) Agile Model',
      D:'D) DevOps',
      userinput:'',
      ans:'Answer: A) Waterfall Model', 
    },
    {
      QuestionStatement: "5. What does CI/CD stand for in the context of DevOps?",
      A:'A) Continuous Integration/Continuous Deployment',
      B:'B) Component Integration/Continuous Development',
      C:'C) Continuous Improvement/Continuous Design',
      D:'D) Code Integration/Code Deployment',
      userinput:'',
      ans:'Answer: A) Continuous Integration/Continuous Deployment', 
    },
    {
      QuestionStatement: "6. In version control systems, what is a branch?",
      A:'A) A copy of the project with separate development history',
      B:'B) The main file storing project data',
      C:'C) A function used to handle errors',
      D:'D) A testing environment for software',
      userinput:'',
      ans:'Answer: A) A copy of the project with separate development history', 
    },
    {
      QuestionStatement: "7. What is the main advantage of Object-Oriented Programming (OOP)?",
      A:'A) It focuses on procedural code organization',
      B:'B) It enables the reuse and organization of code through objects and classes',
      C:'C) It does not require a compiler',
      D:'D) It only uses a single function for all operations',
      userinput:'',
      ans:'Answer: B) It enables the reuse and organization of code through objects and classes', 
    },
    {
      QuestionStatement: "8. What is refactoring in software development?",
      A:'A) Adding new features to software',
      B:'B) Optimizing code without changing its behavior',
      C:'C) Writing the initial code',
      D:'D) Testing software performance',
      userinput:'',
      ans:'Answer: B) Optimizing code without changing its behavior', 
    },
    {
      QuestionStatement: "9. In software engineering, which of the following is NOT a principle of SOLID design?",
      A:'A) Single Responsibility Principle',
      B:'B) Open/Closed Principle',
      C:'C) Layered Principle',
      D:'D) Dependency Inversion Principle',
      userinput:'',
      ans:'Answer: C) Layered Principle', 
    },
    {
      QuestionStatement: "10. What is the purpose of unit testing?",
      A:'A) To validate the system as a whole',
      B:'B) To verify the correctness of individual functions or modules',
      C:'C) To test the system’s security',
      D:'D) To check for performance issues',
      userinput:'',
      ans:'Answer: B) To verify the correctness of individual functions or modules', 
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    const savedIndex = JSON.parse(localStorage.getItem('currentQuestionIndex'));

    if (savedAnswers) setUserAnswers(savedAnswers);
    if (savedIndex) setCurrentQuestionIndex(savedIndex);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);

    localStorage.setItem('userAnswers', JSON.stringify(updatedAnswers));
    localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
  };

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
  }, [currentQuestionIndex]);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(''));
    setShowSummary(false);
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('currentQuestionIndex');
  };

  return (
    <div className="App">
      <div className="container-fluid p-5 bg-black text-white text-center">
        <h1>Code Quest Quiz App</h1>
        <p>Total {questions.length} Questions</p>
      </div>

      {!showSummary ? (
        <>
          <QuizResults 
            QuestionStatement={questions[currentQuestionIndex].QuestionStatement} 
            A={questions[currentQuestionIndex].A} 
            B={questions[currentQuestionIndex].B} 
            C={questions[currentQuestionIndex].C} 
            D={questions[currentQuestionIndex].D} 
            selectedAnswer={userAnswers[currentQuestionIndex]} 
            onAnswerSelect={handleAnswerSelect} 
          />
          <div className="d-flex justify-content-between mt-3">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="btn btn-secondary">
              Previous
            </button>
            <button 
              onClick={handleNext} 
              disabled={!userAnswers[currentQuestionIndex]}
              className="btn btn-primary"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <>
          <QuizSummary questions={questions} userAnswers={userAnswers} />
          <div className="text-center mt-4">
            <button onClick={handleRestart} className="btn btn-success">
              Restart Quiz
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;