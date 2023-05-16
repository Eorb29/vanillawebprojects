//사용 변수
const GAME_TIME = 5;
// let time = 9; <- 첨엔 숫자마다 시간을 부여했지만 그렇게되면 하드코딩이 되기에 변수로 숫자를 부여
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();
function init()
{
    getwords();
    wordInput.addEventListener('input', checkMatch);
}

// HTML 에 onclick run함수를 입력해서 클릭시 변화가 생기도록함
// run 상태에서 isplaying true로 두기 그래야 false 에서 재실행 됨
// 게임 실행 버튼
function run() {
  isPlaying = true;
  time = GAME_TIME;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50)
  scoreDisplay.innerText = 0;
  buttonChange('게임중')
} 

// 단어 불러오기
function getwords(){
  words = ['dudaji','banana','apple','melon','study'];
}

// 이벤트생성, toLowercase로 무조건 소문자비교
// 같은 단어 일치시 점수 흭득
// 단어 체크, 매치
function checkMatch(){
  if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
    wordInput.value = "";
      //지속적으로 점수가 오르지않게 초기화 해주는 변수
    if(!isPlaying) {
        return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    // 랜덤 숫자 뽑기 위한 math.floor 사용
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex]
  }
}


// 게임 종료
function checkStatus(){ // === 으로 타입까지 비교.
    if(!isPlaying){
        buttonChange("게임 시작")
        clearInterval(checkInterval)
    }

}

// 시간 초 5초 계산
// 1초마다 실행
function countDown(){
  time > 0 ? time-- : isPlaying = false;  // 3항연산자 (조건) ? 참일경우 : 거짓일경우 , Playing은 상태를 관리하기에 전역변수 부여 
  // 0초때 실행 안되게 막아주는 
  // false 인경우 종료 후 다시 초기화
    if(!isPlaying){
        clearInterval(timeInterval)
    }
  timeDisplay.innerText = time;
}
// 5초제한 + 디스플레이 문구 일치시 점수 올라가는것 구현
// 해야할것 -> 시작버튼이 활성화 되고 클릭시 5초가 초기화 되어야함 
// 버튼 클릭시 시간 발동 또는 종료
function buttonChange(text) {
    button.innerText = text;
    // 게임시작시 로딩을 삭제 게임 종료시 로딩 호출
    text === '게임 시작' ? button.classList.remove('loading') : button.classList.add('loading')
}

