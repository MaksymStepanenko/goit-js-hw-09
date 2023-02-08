const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const TIMER = 1000;
let changeColorId = null;

// btn style
startBtn.style.padding = '20px 30px';
stopBtn.style.padding = '20px 30px';
//

stopBtn.disabled = true;

//click to shange color
const onStartClick = () => {
  changeColorId = setInterval(() => {
    getBodyColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, TIMER);
};

startBtn.addEventListener('click', onStartClick);

//click stop

const onStopClick = () => {
  clearInterval(changeColorId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

stopBtn.addEventListener('click', onStopClick);

// function

function getBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
