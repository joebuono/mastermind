import { useEffect, useState } from 'react';

export default function ScoreIncrement({previousScore, updatedScore}) {
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

    return () => clearInterval(timer);

  }, [previousScore, updatedScore]);

  return <div>{score}</div>;
};