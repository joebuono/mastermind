import React, { Component } from 'react';
import Colors from './Colors.jsx';

class MakeCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretCode: []
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

  componentDidMount() {
    this.setState({
      secretCode: new Array(this.props.codeSize).fill('x')
    });
  }

  render() {
    return (
      <div>
        {/* Secret Code */}
        <Colors colors={this.state.secretCode} removeColorFromGuess={this.removeColorFromGuess} />
        {/* Color Options */}
        <Colors colors={this.props.colorOptions} updateCurrentGuess={this.updateSecretCode}/>
        <button onClick={this.submitSecretCode}>Make Secret Code</button>
      </div>
    );
  }
};

export default MakeCode;