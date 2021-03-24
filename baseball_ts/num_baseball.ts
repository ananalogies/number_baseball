const form_el: HTMLFormElement = document.querySelector("form")!;
const input_el: HTMLInputElement = document.querySelector("input")!;
const result_el: HTMLDivElement = document.querySelector("#result")!;
const lefts_el: HTMLDivElement = document.querySelector("#lefts")!;
const reset_el: HTMLButtonElement = document.querySelector("#reset")!;

function randomNumber() {
  const result: number[] = [];
  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 4; i++) {
    const chosen = numArr.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    result.push(chosen);
  }
  return result;
}

let answer: number[] = [];
let left_time = 0;

initialize();

function initialize() {
  answer = randomNumber();
  console.log(answer);
  left_time = 10;
  result_el.textContent = "";
  reset_el.style.display = "none";
  lefts_el.textContent = `남은 횟수 ${left_time}회`;
  input_el.focus();
}

form_el.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = parseInt(input_el.value, 10);
  left_time -= 1;
  if (input !== parseInt(answer.join(""), 10)) {
    if (left_time !== 0) {
      const input_array = Array.from(String(input), (num) => Number(num));
      let strikes = 0;
      let balls = 0;
      for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] === answer[i]) {
          strikes += 1;
        } else {
          if (answer.includes(input_array[i])) {
            balls += 1;
          }
        }
      }
      result_el.textContent = `스트라이크: ${strikes}회, 볼: ${balls}회`;
      lefts_el.textContent = `남은 횟수 ${left_time}회`;
    } else {
      // 실패
      lefts_el.textContent = `남은 횟수 ${left_time}회`;
      result_el.textContent = "Game Over! 🤣";
      reset_el.style.display = "block";
    }
  } else {
    // 정답
    result_el.textContent = "정답을 맞히셨습니다. 축하해요 🎉 👏";
    reset_el.style.display = "block";
  }
  input_el.value = "";
  input_el.focus();
});

reset_el.addEventListener("click", () => {
  initialize();
});
