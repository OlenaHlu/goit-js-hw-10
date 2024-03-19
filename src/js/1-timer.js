
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


let userSelectedDate;
let timeInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      timeInterval = userSelectedDate - new Date();
      if (timeInterval < 1) {
          iziToast.error({
              color: 'red',
              title: 'Error',
              position: 'topRight',
              message: `Please choose a date in the future`,
          });
      } else {
          btnStart.disabled = false;
          inputTime.disabled = true;
          btnStart.classList.add(`btn-active`);
          iziToast.success({
              color: 'green',
              title: 'Success',
              position: 'topRight',
              message: `Good job!`
          });
      }
  },
};

const btnStart = document.querySelector('button');
const inputTime = document.querySelector('#datetime-picker');
const inputCalendar = flatpickr('#datetime-picker', options);
const showTime = document.querySelectorAll('.value');

btnStart.disabled = true;

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

btnStart.addEventListener('click', event => {
    const intervalId = setInterval(() => {
        timeInterval = userSelectedDate - new Date();
        btnStart.classList.remove('btn-active');
        if (timeInterval < 1) {
            btnStart.disabled = true;
            clearInterval(intervalId);
            return;
        }
        const timer = convertMs(timeInterval);
        showTime[0].innerText = timer.days.toString().padStart(2, '0');
        showTime[1].innerText = timer.hours.toString().padStart(2, '0');
        showTime[2].innerText = timer.minutes.toString().padStart(2, '0');
        showTime[3].innerText = timer.seconds.toString().padStart(2, '0');
    }, 1000);
});


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

