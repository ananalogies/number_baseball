"use strict";
var form_el = document.querySelector("form");
var input_el = document.querySelector("input");
var result_el = document.querySelector("#result");
var lefts_el = document.querySelector("#lefts");
var reset_el = document.querySelector("#reset");
function randomNumber() {
    var result = [];
    var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < 4; i++) {
        var chosen = numArr.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        result.push(chosen);
    }
    return result;
}
var answer = [];
var left_time = 0;
initialize();
function initialize() {
    answer = randomNumber();
    console.log(answer);
    left_time = 10;
    result_el.textContent = "";
    reset_el.style.display = "none";
    lefts_el.textContent = "\uB0A8\uC740 \uD69F\uC218 " + left_time + "\uD68C";
    input_el.focus();
}
form_el.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = parseInt(input_el.value, 10);
    left_time -= 1;
    if (input !== parseInt(answer.join(""), 10)) {
        if (left_time !== 0) {
            var input_array = Array.from(String(input), function (num) { return Number(num); });
            var strikes = 0;
            var balls = 0;
            for (var i = 0; i < input_array.length; i++) {
                if (input_array[i] === answer[i]) {
                    strikes += 1;
                }
                else {
                    if (answer.includes(input_array[i])) {
                        balls += 1;
                    }
                }
            }
            result_el.textContent = "\uC2A4\uD2B8\uB77C\uC774\uD06C: " + strikes + "\uD68C, \uBCFC: " + balls + "\uD68C";
            lefts_el.textContent = "\uB0A8\uC740 \uD69F\uC218 " + left_time + "\uD68C";
        }
        else {
            // 실패
            lefts_el.textContent = "\uB0A8\uC740 \uD69F\uC218 " + left_time + "\uD68C";
            result_el.textContent = "Game Over! 🤣";
            reset_el.style.display = "block";
        }
    }
    else {
        // 정답
        result_el.textContent = "정답을 맞히셨습니다. 축하해요 🎉 👏";
        reset_el.style.display = "block";
    }
    input_el.value = "";
    input_el.focus();
});
reset_el.addEventListener("click", function () {
    initialize();
});
