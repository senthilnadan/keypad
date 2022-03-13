import React, { useEffect } from "react";
import "./index.scss";
import {
  realConsonantSet,
  cartesianProductSet,
  consonantSet,
  characterSet,
  topPanel,
  leftPanal,
  rightPanel,
  bottomPanel,
} from "./characterSet";

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

const Panel = ({ keys, onKeySelect }) => {
  return (
    <div className="panel">
      {keys.map((item) => (
        <Key keyitem={item} onKeySelect={onKeySelect} />
      ))}
    </div>
  );
};

const KeyPad = ({
  keyset,
  onKeySelect,
  leftPanelkeys,
  topPanelkeys,
  rightPanelkeys,
  bottomPanelkeys,
  ...props
}) => {
  return (
    <div className="keyboard-container">
      <div className="key-bank">
        <div className="key-rows">
          {keyset.map((row) => (
            <PadRow row={row} onKeySelect={onKeySelect} />
          ))}
        </div>
      </div>

      <div className="left-panel">
        <Panel keys={leftPanelkeys} onKeySelect={onKeySelect} />
      </div>

      <div className="top-panel">
        <Panel keys={topPanelkeys} onKeySelect={onKeySelect} />
      </div>

      <div className="right-panel">
        <Panel keys={rightPanelkeys} onKeySelect={onKeySelect} />
      </div>
      <div className="bottom-panel">
        <Panel keys={bottomPanelkeys} onKeySelect={onKeySelect} />
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
      topPanelkeys: topPanel.map((item) => item.char),
      rightPanelkeys: rightPanel.map((item) => item.char),
      leftPanelkeys: leftPanal.map((item) => item.char),
      bottomPanelkeys: bottomPanel.map((item) => item.char),
      text: "மனிதக் குடும்பத்தினைச் சேர்ந்த யாவரதும் உள்ளார்ந்த மரியாதையையும், அவர்கள்",
      crossMode: false,
      crossModeBuffer: "",
    };
    this.onKeySelect = this.onKeySelect.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    e.preventDefault();
    console.dir(e);
    if (e.key === "Shift") {
      this.setState((state) => ({
        ...state,
        crossMode: true,
      }));
    }
    if (e.key === "Backspace") {
      this.setState((state) => ({
        ...state,
        text: this.state.text.slice(0, this.state.text.length - 1),
      }));
    }
    if (e.key === " ") {
      this.setState((state) => ({
        ...state,
        text: this.state.text.concat(" "),
      }));
    }
  }
  toRealConsonant(charToBeAdded) {
    return realConsonantSet[charToBeAdded];
  }
  isConsonant(charToBeAdded) {
    return consonantSet.some((item) => item.char === charToBeAdded);
  }
  combineChars(charToBeAdded, crossModeBuffer) {
    return crossModeBuffer != ""
      ? cartesianProductSet[crossModeBuffer][charToBeAdded]
      : charToBeAdded;
  }

  onKeyUp(e) {
    e.preventDefault();
    if (e.key === "Shift") {
      this.setState((state) => ({
        ...state,
        crossMode: false,
      }));
    }
  }
  onKeySelect(e) {
    let charToBeAdded = e.target.innerText;

    if (charToBeAdded == "SPACE") {
      charToBeAdded = " ";
    }
    if (this.state.crossMode) {
      console.log(
        e.target.innerText +
          "crossMode :" +
          this.state.crossMode +
          charToBeAdded +
          " is Consonant " +
          this.isConsonant(charToBeAdded) +
          " crossModeBuffer " +
          this.state.crossModeBuffer +
          " isTruconsonant " +
          this.toRealConsonant(charToBeAdded)
      );

      this.isConsonant(charToBeAdded)
        ? this.state.crossModeBuffer === charToBeAdded
          ? this.setState((state) => ({
              ...state,
              crossModeBuffer: "",
              text: state.text.concat(this.toRealConsonant(charToBeAdded)),
            }))
          : this.setState((state) => ({
              ...state,
              crossModeBuffer: charToBeAdded,
            }))
        : this.setState((state) => ({
            ...state,
            text: state.text.concat(
              this.combineChars(charToBeAdded, this.state.crossModeBuffer)
            ),
          }));
    } else
      this.setState((state) => ({
        ...state,
        text: state.text.concat(charToBeAdded),
      }));
  }
  render() {
    return (
      <div onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
        <TextArea text={this.state.text} />
        <div id="seperator"></div>
        <KeyPad
          keyset={this.state.keyset}
          onKeySelect={this.onKeySelect}
          topPanelkeys={this.state.topPanelkeys}
          leftPanelkeys={this.state.leftPanelkeys}
          bottomPanelkeys={this.state.bottomPanelkeys}
          rightPanelkeys={this.state.rightPanelkeys}
          crossMode={this.crossMode}
        />
      </div>
    );
  }
}
export default App;
