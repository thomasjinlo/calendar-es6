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
  const firstDayOfMonth = date => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysOfMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

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

  const renderNewDate = newDate => {
    renderToday(newDate)
    renderMonthYear(newDate)
    resetTable(newDate)
  }

  const resetTable = newDate => {
    $('tbody').children().remove()
    generateTable(newDate)
  }

  // helper functions
  const repeat = times => action => arg => {
    if (times > 0)
      return repeat (times - 1) (action) (action(arg))
    else
      return arg
  }

  const makeEmptySquares = times => {
    const emptySquare = (body) => {
      let $td = $('<td />');
      $(body).append($td)
      return body
    }
    return repeat (times) (emptySquare) ($('tbody'))
  }

  const makeSquares = times => {
    const square = (args) => {
      let $td = $('<td />');
      $td.data('day', args.get('idx')).addClass('square').html(args.get('idx'))
      $(args.get('body')).append($td)
      return args.updateIn(['idx'], idx => idx + 1)
    }
    return repeat (times) (square) (Map({idx: 1, body: $('tbody')}))
  }

  // generate table columns
  const generateTable = date => {
    makeEmptySquares(firstDayOfMonth(date))
    makeSquares(daysOfMonth(date))
  }

  // set event handlers
  const makeSquaresClickable = date => {
    const changeDate = date => e => {
      let newDate = new Date(date.getFullYear(), date.getMonth(), $(e.target).data('day'));
      renderNewDate(newDate)
    }
    // delegate handlers to container
    $('tbody').delegate('.square', 'click', changeDate(date))
  }

  // factory
  const initializer = date => {
    const init = date => {
      renderToday(date);
      renderMonthYear(date);
      generateTable(date);
      makeSquaresClickable(date);
    };
    return {init: init}
  };

  return Object.assign({}, initializer());
})()


$(document).ready(() => {
  let date = new Date();
  Calendar.init(date)
})
