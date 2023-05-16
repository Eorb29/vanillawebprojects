//사용 변수
let score = 0;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');

//이벤트생성 이벤트,기능 순 es6 애로우기능 사용
wordInput.addEventListener('input',() => {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase())
        score++;
        scoreDisplay.innerText = score;
})

