// 음성인식 API 사용
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';

// 1과 100사이 난수
// 0과 1사이의 난수를 반환 이에 100을 곱하고 함수로 내림하여 1과 100사이의 정수를 얻는다 
const randomNumber = Math.floor(Math.random() * 100) + 1;

// 시작부분
recognition.start();

recognition.addEventListener('result', handleResult);

recognition.addEventListener('error', () => {
  document.getElementById('message').innerHTML = 'Speech recognition error occurred. Please try again.';
});


function handleResult(event) {
  const speechResult = event.results[0][0].transcript;
  const messageElement = document.getElementById('message');

  messageElement.innerHTML = `You said: ${speechResult}.`;

  const guessedNumber = parseInt(speechResult);
  if (isNaN(guessedNumber)) {
    messageElement.innerHTML += ` That's not a valid number. Please try again.`;
  } else if (guessedNumber < 1 || guessedNumber > 100) {
    messageElement.innerHTML += ` The number must be between 1 and 100. Please try again.`;
  } else if (guessedNumber === randomNumber) {
    messageElement.innerHTML += ` Congratulations! You guessed the number ${randomNumber}.`;
    recognition.stop();
  } else if (guessedNumber > randomNumber) {
    messageElement.innerHTML += ` Go lower. Please try again.`;
  } else {
    messageElement.innerHTML += ` Go higher. Please try again.`;
  }

  recognition.start();
}

// 새로고침
document.body.addEventListener('click', (event) => {
  if (event.target.id === 'play-again') {
    window.location.reload();
  }
});