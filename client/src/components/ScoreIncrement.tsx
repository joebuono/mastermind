import { useEffect, useState } from 'react';

// This component is responsible for gradually incrementing the displayed score when a round is over

type Props = {
  previousScore: number,
  updatedScore: number
}

export default function ScoreIncrement({previousScore, updatedScore}: Props) {
  const [score, setScore] = useState(previousScore);

  useEffect(() => {
    let start = previousScore;
    const end = updatedScore;

    let timer = setInterval(() => {
      setScore(++start);
      if (start === end) clearInterval(timer);
    }, 200);

  }, [previousScore, updatedScore]);

  return <div>{score}</div>;
};