let List = Immutable.List;
let Map = Immutable.Map;

const Calendar = (() => {
  // constants
  const DAYSOFWEEK = List.of(
    Map({sh: 'Su', lg: 'Sunday'}),
    Map({sh: 'Mo', lg: 'Monday'}),
    Map({sh: 'Tu', lg: 'Tuesday'}),
    Map({sh: 'We', lg: 'Wednesday'}),
    Map({sh: 'Th', lg: 'Thursday'}),
    Map({sh: 'Fr', lg: 'Friday'}),
    Map({sh: 'Sa', lg: 'Saturday'})
  );

  const MONTHS = List.of(
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
  );

  // pure functions to get data
  const numDay = date => date.getDate();
  const wordDay = date => DAYSOFWEEK.getIn([date.getDay(), 'lg']);
  const month = date => MONTHS.get(date.getMonth());
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

  const renderMonthYear = date => {
    let monthYear = `${month(date)} ${year(date)}`
    $('#monthYear').html(monthYear);
  };

  // generate table columns
  const generateTable = () => {
    let $tbody = $('tbody');
    for (var i = 0; i < 6; i++) {
      let $row = $('<tr />');
      for (var j = 0; j < 7; j++) {
        $row.append($('<td />'))
      }
      $tbody.append($row)
    }
  }

  // factory
  const initializer = date => {
    const init = date => {
      renderToday(date);
      renderMonthYear(date);
      generateTable();
    };
    return {init: init}
  };

  return Object.assign({}, initializer());
})()


$(document).ready(() => {
  let date = new Date();
  Calendar.init(date)
})
