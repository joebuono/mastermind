import React, { Component } from 'react';
import Board from './board/Board.jsx';
import InitGame from './InitGame.jsx';

class GameView extends Component {
  constructor(props) {
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

  initializeGame = (codeSize, rounds, attempts, difficulty, whoStarts) => {
    this.setState({
      codeSize,
      roundLimit: rounds,
      turnsPerRound: attempts,
      difficulty: difficulty === 'Naive' ? 'easy' : 'hard',
      humanStarts: whoStarts === 'Me',
      initGame: false
    });
  }

  modifyDisplayedColorTracker = (updatedColorTrackerData) => {
    this.setState({ colorTrackerData: updatedColorTrackerData });
  }

  nextRound = () => {
    this.setState({ round: this.state.round + 1 });
  }

  updateScore = (codeBreaker, pointsScoredInRound) => {
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