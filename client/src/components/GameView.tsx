import { Component } from 'react';
import Board from './board/Board.jsx';
import InitGame from './InitGame';

type State = {
  initGame: boolean,
  humanStarts: boolean,
  difficulty: string,
  playerName: string,
  playerScore: number,
  computerScore: number,
  codeSize: number,
  round: number,
  roundLimit: number,
  turnsPerRound: number,
  colorTrackerData?: any,
  [x: string]: any
}

class GameView extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      initGame: true,
      humanStarts: true,
      difficulty: 'hard',
      playerName: 'You',
      playerScore: 0,
      computerScore: 0,
      codeSize: 4,
      round: 1,
      roundLimit: 3,
      turnsPerRound: 8
    };
  }

  initializeGame = (codeSize: number, rounds: number, attempts: number, difficulty: string, whoStarts: string) => {
    this.setState({
      codeSize,
      roundLimit: rounds,
      turnsPerRound: attempts,
      difficulty: difficulty === 'Naive' ? 'easy' : 'hard',
      humanStarts: whoStarts === 'Me',
      initGame: false
    });
  }

  modifyDisplayedColorTracker = (updatedColorTrackerData: any) => {
    this.setState({ colorTrackerData: updatedColorTrackerData });
  }

  nextRound = () => {
    this.setState({ round: this.state.round + 1 });
  }

  updateScore = (codeBreaker: string, pointsScoredInRound: number) => {
    let whoScored = codeBreaker + 'Score';
    this.setState({
      [whoScored]: this.state[whoScored] + pointsScoredInRound
    });
  }

  restartGame = () => {
    this.setState({
      initGame: true,
      playerScore: 0,
      computerScore: 0,
      round: 1
    });
  }

  render() {
    const { codeSize, humanStarts, difficulty, turnsPerRound, initGame, roundLimit } = this.state;
    return (
      <div>
        {initGame ? <InitGame initializeGame={this.initializeGame} codeSize={codeSize} rounds={roundLimit} attempts={turnsPerRound} difficulty={'Optimal'} whoStarts={'Me'}/> : 
        <Board codeSize={codeSize} updateScore={this.updateScore} nextRound={this.nextRound} humanStarts={humanStarts} difficulty={difficulty} turnsPerRound={turnsPerRound} gameViewState={Object.assign({}, this.state)} restartGame={this.restartGame}/>}
      </div>
    );
  }
}

export default GameView;