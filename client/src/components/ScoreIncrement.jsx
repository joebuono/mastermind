import React, { useEffect, useState } from 'react';

const ScoreIncrement = ({previousScore, updatedScore}) => {

  // Number displayed by component
  const [score, setScore] = useState(previousScore);

  useEffect(() => {
    let start = previousScore;
    const end = updatedScore;

    if (start === end) return;

    let timer = setInterval(() => {
      start += 1;
      setScore(start);
      if (start === end) clearInterval(timer);
    }, 200);

  }, [previousScore, updatedScore]);

  return (
    <div>{score}</div>
  );
};

export default ScoreIncrement;