const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const holdTime = (totalTime / 100) * 20;
const inOutTime = (totalTime / 100) * 40;

const breathe = () => {
  text.innerText = "Breath In !";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "Hold";
    container.className = "container hold";

    setTimeout(() => {
      text.innerText = "Breath Out !";
      container.className = "container shrink";
    }, holdTime);
  }, inOutTime);
};

breathe();

setInterval(() => {
    breathe();
}, totalTime);