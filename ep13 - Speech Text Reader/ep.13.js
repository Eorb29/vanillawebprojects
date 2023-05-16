// date [이미지경로,말할문구]  
const data = [
  ["image/water.jpg", "I'm THIRSTY"], ["image/hungry.jpg", "I'M HUNGRY"],
  ["image/tired.jpg", "I'M TIRED"], ["image/hurt.jpg", "I'M HURT"],
  ["image/happy.jpg", "I'M HAPPY"], ["image/angry.webp", "I'M ANGRY"],
  ["image/sad.png", "I'M SAD"], ["image/scared.png", "I'M SCARED"],
  ["image/outside.jpg", "I WANT TO GO OUTSIDE"], ["image/home.jpg",  "I WANT TO GO HOME"],
  ["image/school.jpg",  "I WANT TO GO TO SCHOOL"], ["image/grandma.jpg", "I WANT TO GO TO GRANDMAS"]
];

/* 사진 및 글 목록 12개 생성 */
window.onload = function () { // 페이지가 로드된 후 12개사진 생성
  for (let i = 0; i < 12; i++) { // 이미지+문구 Div 
    create(i);
  }
}

/* 사진 및 글 목록 생성 */
function create(i) {

  let main = document.createElement("div") /* 메인이 사진과 글을 감싸는 형태 */
  main.className = "main";
  main.onclick = function () {
    speak(data[i][1], select.value);
  }

  let image = new Image();
  image.src = data[i][0];

  let comment = document.createElement("p");
  comment.className = "comment";
  comment.append(data[i][1]); // 이미지 아래에 들어갈 글(comment)

  main.appendChild(image);
  main.appendChild(comment);

  document.getElementById("container").appendChild(main);
}

const select = document.getElementById("lang")    //select 정보
const text = document.getElementById("text")      //input 정보
const btn = document.getElementById("btn")        //button 정보

// 클릭 이벤트 시 발생
btn.addEventListener("click", e => {
  speak(text.value, select.value);
})

/* 소리 출력 */
function speak(text, language) {
  window.speechSynthesis.cancel(); // 초기화

  /* input이 비어있다면 */
  if(!text)
  {
    text = "Please fill in the blank";
  }

  const speechMsg = new SpeechSynthesisUtterance();
  speechMsg.lang = language;      //언어 설정
  speechMsg.text = text;          //글 설정

  window.speechSynthesis.speak(speechMsg);   //소리 출력
}