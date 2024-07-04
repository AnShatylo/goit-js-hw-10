import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const dataChooseBtn = document.querySelector('[data-start]');
const dataText = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const dataTimePicker = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.error({
        backgroundColor: '#EF4040',
        title: 'Error',
        message: 'Please choose a date in the future',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#B51B1B',
      });
      dataChooseBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      dataChooseBtn.disabled = false;
    }
    console.log(userSelectedDate);
    convertMs(userSelectedDate);
  },
};

flatpickr(dataTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, '0');

function addTimerData() {
  const setTimer = setInterval(() => {
    const currentDate = new Date();
    const ms = userSelectedDate - currentDate;
    if (ms <= 0) {
      clearInterval(setTimer);
      dataChooseBtn.disabled = true;
      dataTimePicker.disabled = false;
      return;
    }

    const time = convertMs(ms);
    dataText.days.textContent = addLeadingZero(time.days);
    dataText.hours.textContent = addLeadingZero(time.hours);
    dataText.minutes.textContent = addLeadingZero(time.minutes);
    dataText.seconds.textContent = addLeadingZero(time.seconds);
    dataChooseBtn.disabled = true;
    dataTimePicker.disabled = true;
  }, 1000);
}

dataChooseBtn.addEventListener('click', addTimerData);
