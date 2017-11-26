let dayEl = document.querySelector('.js-current-day');
let dateEl = document.querySelector('.js-current-date');
let monthEl = document.querySelector('.js-current-month');

let monthContainer = document.querySelector('.selector.months');
let dayContainer = document.querySelector('.selector.days');
let months = document.querySelectorAll('.selector.month');
let days = document.querySelectorAll('.selector.day');
let currentMonth;
let currentDay;

function dayOfWeekAsString(dayIndex) {
  return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
}

function monthAsString(index) {
  return ["January","February","March","April","May","June","July","August","September","October","November","December"][index];
}

function activateMonths() {
  monthContainer.classList.add('active');
  dayContainer.classList.remove('active');
}

function activateDays() {
  dayContainer.classList.add('active');
  monthContainer.classList.remove('active');
}

function resetToCurrent() {
  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();

  currentMonth = month;
  currentDay = day;

  dayEl.innerText = dayOfWeekAsString(date.getDay());
  dateEl.innerText = date.getDate();
  monthEl.innerText = monthAsString(month);

  months[month].classList.add('active');
}

function hideInvalidDays() {
    let num = new Date(new Date().getFullYear(), currentMonth+1, 0).getDate();

    days.forEach( (el, index) => {
      console.log(num, index);
      el.classList.toggle("hide", ( index > num ));
    });
}

function updateMonthToSet() {
  let date = new Date();
  date.setMonth(currentMonth);
  dayEl.innerText = '--';
  dateEl.innerText = '--';
  monthEl.innerText = monthAsString(date.getMonth());
}

function updateDayToSet() {
  let date = new Date();
  date.setMonth(currentMonth, currentDay+1);
  dayEl.innerText = dayOfWeekAsString(date.getDay());
  dateEl.innerText = date.getDate();
}

months.forEach((el, index) => {
  el.addEventListener('click', evt => {
    document.querySelector('.selector.month.active').classList.remove('active');
    evt.currentTarget.classList.add('active');
    monthEl.innerText = monthAsString(index);
    currentMonth = index;
    updateMonthToSet();
    hideInvalidDays();
    activateDays();
  });
});

days.forEach((el, index) => {
  el.addEventListener('click', evt => {
    dateEl.innerText = index+1;
    currentDay = index;
    updateDayToSet();
    activateMonths();
  });
});

resetToCurrent();
setTimeout(activateMonths, 150);
