import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  const result = [];
  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 4; i++) {
    const chosen = numArr.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    result.push(chosen);
  }
  console.log(result);
  return result;
}

class Baseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { state } = this;
    if (parseInt(state.value, 10) !== parseInt(state.answer.join(""), 10)) {
      
        const input_array = state.value.split("").map((v) => parseInt(v, 10));
        let strikes = 0;
        let balls = 0;
        for (let i = 0; i < input_array.length; i++) {
          if (input_array[i] === state.answer[i]) {
            strikes += 1;
          } else {
            if (state.answer.includes(input_array[i])) {
              balls += 1;
            }
          }
        }
        this.setState({
          tries: [
            ...state.tries,
            {
              try: state.value,
              result: `스트라이크: ${strikes}회, 볼: ${balls}회`,
            },
          ],
          value: "",
        });

        if (state.tries.length >= 9) {
        this.setState({
          result: "Game Over! 🤣",
          value: "",
        });
        this.button.style.display = "block";
      }
    } else {
      // 성공
      this.setState({
        result: "정답을 맞히셨습니다. 축하해요 🎉 👏",
        value: "",
      });
      this.button.style.display = "block";
    }
    this.input.focus();
  }

  resetBtn = (e) => {
    this.setState({
      result: '',
      value: '',
      answer: getNumbers(),
      tries: [],
    })
    this.button.style.display = "none";
    this.input.focus();
  }

  button;
  refBtn = (c) => {
    this.button = c;
  };

  input;
  refInput = (c) => {
    this.input = c;
  };

  render() {
    const { state } = this;
    return (
      <>
        <div id="result">{state.result}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.refInput}
            maxLength={4}
            type="number"
            value={state.value}
            onChange={this.onChangeInput}
          />
          <button>입력</button>
        </form>
        <button id="reset" ref={this.refBtn} onClick={this.resetBtn}>
          다시하기
        </button>
        <div id="lefts">시도횟수: {state.tries.length} / 10</div>
        <ul>
          {state.tries.map((value, index) => {
            return <Try key={index} value={value} />;
          })}
        </ul>
      </>
    );
  }
}

export default Baseball;
