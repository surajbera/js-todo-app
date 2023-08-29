/* creating a digital clock */

let hoursEl = document.getElementById('hour-wrap');
let minutesEl = document.getElementById('miniute-wrap');
let secondsEl = document.getElementById('seconds-wrap');

const getCurrentTimestamp = () => {
  return new Date().getTime();
};

const updateTime = () => {
  const now = new Date();

  /* get current hours, minutes, seconds */
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  /* update the text content of the elements */
  hoursEl.innerText = String(hours).padStart(2, '0');
  minutesEl.innerText = String(minutes).padStart(2, '0');
  secondsEl.innerText = String(seconds).padStart(2, '0');
};

/* update the time initially to avoid 1 second delay */
updateTime();

setInterval(updateTime, 1000);
