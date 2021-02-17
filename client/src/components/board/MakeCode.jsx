import React, { Component } from 'react';
import Colors from './Colors.jsx';
import styles from '../styles/makeCode.module.css';
import { generateSecretCode } from '../../solverAlgorithm/globalLogic.js';

class MakeCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretCode: [],
      codeSize: this.props.codeSize
    }
  }

  updateSecretCode = (colorToAddToGuess) => {
    const updatedSecretCode = [...this.state.secretCode];
    for (let i = 0; i < updatedSecretCode.length; i++) {
      if (updatedSecretCode[i] === 'x') {
        updatedSecretCode[i] = colorToAddToGuess;
        break;
      }
    }

    this.setState({secretCode: updatedSecretCode});
  }

    // This needs to only work for the current guess
  removeColorFromGuess = (colorIndex) => () => {
    // remove color from current guess
    let updatedSecretCode = [...this.state.secretCode];
    updatedSecretCode[colorIndex] = 'x';

    this.setState({
      secretCode: updatedSecretCode
    });
  }

  submitSecretCode = () => {
    const { secretCode } = this.state;
    if (!secretCode.includes('x')) {
      // send up secretCode to ComputerBoard component
      this.props.setSecretCode(secretCode);
    } else {
      console.log('incomplete guess');
    }
  }

  generateRandomCode = () => {
    const randomCode = generateSecretCode(this.state.codeSize);
    this.setState({secretCode: randomCode});
  }

  componentDidMount() {
    this.setState({
      secretCode: new Array(this.props.codeSize).fill('x')
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {/* Secret Code */}
        <div className={styles.title}>Codemaker</div>
        <div className={styles.secretCode}>
          <Colors colors={this.state.secretCode} removeColorFromGuess={this.removeColorFromGuess} />
        </div>
        {/* Color Options */}
        <div className={styles.colorOptions}>
          <Colors colors={this.props.colorOptions} updateCurrentGuess={this.updateSecretCode}/>
        </div>
        {/* Buttons */}
        <div className={styles.buttons}>
          <div className={this.state.secretCode.includes('x') ? styles.incompleteCode : styles.submitCode} onClick={this.submitSecretCode}>Submit Code</div>
          <div className={styles.randomCode} onClick={this.generateRandomCode}>Random Code</div>
        </div>
      </div>
    );
  }
};

export default MakeCode;