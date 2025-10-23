import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // If time runs out, reset and trigger onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10); // reset timer
      onAnswered(false); // tell App that time ran out
      return;
    }

    // Countdown logic: decrease timer every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function to clear timeout before next render
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  return (
    <div className="question">
      <h2>{question.question}</h2>
      <h5>{timeRemaining} seconds remaining</h5>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer}>
            <button onClick={() => onAnswered(answer === question.correct)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;