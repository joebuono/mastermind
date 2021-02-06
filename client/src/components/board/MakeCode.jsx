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
    const { secretCode } = this.state;
    for (let i = 0; i < secretCode.length; i++) {
      if (secretCode[i] === 'x') {
        secretCode[i] = colorToAddToGuess;
        break;
      }
    }

    this.setState({secretCode});
  }

  submitSecretCode = () => {
    console.log('inside submitSecretCode');
    const { secretCode } = this.state;
    if (!secretCode.includes('x')) {
      // send up secretCode to ComputerBoard component
      console.log('beam me up, SCORTRRRR!!!');
      console.log(secretCode);
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
        <Colors colors={this.state.secretCode} />
        {/* Color Options */}
        <Colors colors={this.props.colorOptions} updateCurrentGuess={this.updateSecretCode}/>
        <button onClick={this.submitSecretCode}>Make Secret Code</button>
      </div>
    );
  }
};

export default MakeCode;