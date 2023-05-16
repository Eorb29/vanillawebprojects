// HTML 에서 갖고올 변수들부터 선언하기!
const cardsContainer = document.getElementById('cards-container'); 
const prevBtn = document.getElementById('prev'); 
const nextBtn = document.getElementById('next'); 
const currentEl = document.getElementById('current'); 
const showBtn = document.getElementById('show'); 
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question'); 
const answerEl = document.getElementById('answer'); 
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear'); 
const addContainer = document.getElementById('add-container'); 

// 초기 인덱스 0 , 요소 장착
let currentActiveCard = 0; 
const cardsEl = []; 
const cardsData = getCardsData(); // getCardsData()로 로컬 스토리지에 저장된 카드 데이터를 가져와 변수 할당

function createCards() {
  cardsData.forEach((data, index)  => createCard(data, index));
}/* 주어진 함수 배열 요소 각각 실행*/

// 카드 생성
function createCard(data, index) { 
  const card = document.createElement('div'); 
  card.classList.add('card'); 
  index === 0 && card.classList.add('active'); 
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `; // 카드 앞뒷면 설정
  
   card.addEventListener('click', () => card.classList.toggle('show-answer'));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`; // 카드번호
}

// json반환 or 비엇으면 빈인덱스 반환
function getCardsData() {
  return JSON.parse(localStorage.getItem('cards')) ?? []; 
}

// json -> 로컬스토리지 -> 새로고침
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// 카드 인덱스 초과하지 못하도록 막기
// 현재를 0보다 작아지지않게 0보다작을시 0이 되도록 설정하기
// 현재숫자가 최대숫자에 도달하면 더이상 넘어가지 않게 마지막으로 설정하기
function navigateCards(direction) {
  cardsEl[currentActiveCard].className = `card ${direction}`;
  currentActiveCard += direction === 'left' ? 1 : -1; // <- 이동시 +1 -> 이동시 -1
  currentActiveCard = currentActiveCard < 0 ? 0 : currentActiveCard > cardsEl.length - 1 ? cardsEl.length - 1 : currentActiveCard; // 조건연산자
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
}
//예를 들어, cardsEl 배열의 길이가 5이고 currentActiveCard 변수가 7일 경우, 위 코드는 7 > 4 조건이 true이므로 
//cardsEl.length - 1인 4를 반환하게 됩니다. 이렇게 함으로써 currentActiveCard 변수가 cardsEl 배열의 길이를 초과하는 경우를 방지할 수 있습니다.

function showAddContainer() {
  addContainer.classList.add('show');
}

//입력창 숨기기 (토글로도 되나?)
function hideAddContainer() {
  addContainer.classList.remove('show');
}

//trim : 문자열 좌우 공백을 제거하는 함수 
function addNewCard() {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();

 // 입력값 x 반환
  if (!question || !answer) return;

  const newCard = { question, answer };
  createCard(newCard);

  // 초기화
  questionEl.value = '';
  answerEl.value = '';
  hideAddContainer();

 // 카드추가
  cardsData.push(newCard);

  //로컬에 저장
  setCardsData(cardsData);
}

function clearCards() {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
}



createCards();
// 페이지 로드시 불러오기

nextBtn.addEventListener('click', () => navigateCards('left'));
prevBtn.addEventListener('click', () => navigateCards('right'));
showBtn.addEventListener('click', showAddContainer);
hideBtn.addEventListener('click', hideAddContainer);
addCardBtn.addEventListener('click', addNewCard);
clearBtn.addEventListener('click', clearCards);