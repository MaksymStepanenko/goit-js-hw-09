import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const startBtn = document.querySelector('button[data-start]');
const inputTimer = document.getElementById('datetime-picker');
const date = new Date();

const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');
const timerWraper = document.querySelector('.timer');
const numbersWraper = document.querySelectorAll('.field');
const spanFonts = document.querySelectorAll('.value')


//style----------------------
for (const span of spanFonts) {
  span.style.fontSize = '25px'
}
for (const number of numbersWraper) {
  number.style.display = 'flex';
  number.style.flexDirection = 'column';
  number.style.alignItems = 'center';
  number.style.border = '3px solid grey';
  number.style.borderRadius = '7px';
  number.style.padding = '15px';
}
timerWraper.style.display = 'flex';
timerWraper.style.gap = '20px';
timerWraper.style.marginTop = '20px';
//------------------------


startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > date.getTime()) {
      startBtn.disabled = false;
    } else {
      window.alert("Please choose a date in the future");
    }
  },
};
startBtn.addEventListener('click', () => {
  const selectDateInput = new Date(inputTimer.value);

  setInterval(() => {
    if (selectDateInput - Date.now() > 0) {
      const deltaTime = selectDateInput - Date.now();
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysTimer.textContent = `${days}`;
      hoursTimer.textContent = `${hours}`;
      minutesTimer.textContent = `${minutes}`;
      secondsTimer.textContent = `${seconds}`;
    } else {
      return;
    }
  }, 1000);
});

const calendar = flatpickr('input', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
