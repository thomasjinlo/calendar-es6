const Calendar = (() => {
  // constants
  const DAYSOFWEEK = [
    {sh: 'Su', lg: 'Sunday'},
    {sh: 'Mo', lg: 'Monday'},
    {sh: 'Tu', lg: 'Tuesday'},
    {sh: 'We', lg: 'Wednesday'},
    {sh: 'Th', lg: 'Thursday'},
    {sh: 'Fr', lg: 'Friday'},
    {sh: 'Sa', lg: 'Saturday'}
  ];

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December'
  ];

  // pure functions to get data
  const numDay = date => date.getDate();
  const wordDay = date => DAYSOFWEEK[date.getDay()]['lg'];
  const month = date => MONTHS[date.getMonth()];
  const year = date => date.getFullYear();
  const firstDayOfMonth = date => new Date(date.getYear(), date.getMonth(), 1).getDay();
  const daysOfMonth = date => new Date(date.getYear(), date.getMonth() + 1, 0).getDate();

  // visual rendering of calendar
  const renderToday = date => {
    renderNumDay(numDay(date));
    renderWordDay(wordDay(date));
  };
  const renderNumDay = numDay => {
    $('#numDay').html(numDay);
  };
  const renderWordDay = wordDay => {
    $('#wordDay').html(wordDay);
  };
  return Object.assign({}, {numDay: numDay}, {wordDay: wordDay}, {DAYSOFWEEK: DAYSOFWEEK})
})()


$(document).ready(() => {
  let date = new Date()
  console.log(Calendar.numDay(date))
  console.log(Calendar.wordDay(date, Calendar.DAYSOFWEEK))
})
