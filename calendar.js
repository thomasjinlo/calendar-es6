const Calendar = (() => {

  const daysOfWeek = [
    {sh: 'Su', lg: 'Sunday'},
    {sh: 'Mo', lg: 'Monday'},
    {sh: 'Tu', lg: 'Tuesday'},
    {sh: 'We', lg: 'Wednesday'},
    {sh: 'Th', lg: 'Thursday'},
    {sh: 'Fr', lg: 'Friday'},
    {sh: 'Sa', lg: 'Saturday'}
  ];

  const numDay = date => date.getDate();
  const wordDay = (date, daysOfWeek) => daysOfWeek[date.getDay()]['lg'];

  return Object.assign({}, {numDay: numDay}, {wordDay: wordDay}, {daysOfWeek: daysOfWeek})
})()


$(document).ready((date = new Date()) => {
  console.log(Calendar.numDay(date))
  console.log(Calendar.wordDay(date, Calendar.daysOfWeek))
})
