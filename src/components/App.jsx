import React, { useEffect } from "react";
import "./index.scss";
import { characterSet } from "./characterSet";

const Key = ({ keyitem, onKeySelect }) => {
  return (
    <div className="key-item">
      <button onClick={onKeySelect}>{keyitem}</button>
    </div>
  );
};

const PadRow = ({ row, onKeySelect }) => {
  return (
    <div className="row-item">
      {row.map((item) => (
        <Key keyitem={item} onKeySelect={onKeySelect} />
      ))}
    </div>
  );
};

const KeyPad = ({ keyset, onKeySelect, ...props }) => {
  return (
    <div className="keyboard-container">
      <div className="key-bank">
        {keyset.map((row) => (
          <PadRow row={row} onKeySelect={onKeySelect} />
        ))}
      </div>
    </div>
  );
};

const TextArea = ({ text }) => {
  return (
    <div className="text-container">
      <textarea value={text}></textarea>;
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyset: characterSet.map((row) => row.map((item) => item.char)),
      text: "மனிதக் குடும்பத்தினைச் சேர்ந்த யாவரதும் உள்ளார்ந்த மரியாதையையும், அவர்கள்",
    };
    this.onKeySelect = this.onKeySelect.bind(this);
  }
  onKeySelect(e) {
    console.log(e.target.innerText);

    this.setState((state) => ({
      ...state,
      text: state.text.concat(e.target.innerText),
    }));
  }
  render() {
    return (
      <div>
        <TextArea text={this.state.text} />
        <div id="seperator"></div>
        <KeyPad keyset={this.state.keyset} onKeySelect={this.onKeySelect} />
      </div>
    );
  }
}
export default App;
