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
    'October',
    'November',
    'December'
  );

  // pure functions to get data
  const numDay = date => date.getDate();
  const wordDay = (date, DAYSOFWEEK) => DAYSOFWEEK.getIn([date.getDay(), 'lg']);
  const month = (date, MONTHS) => MONTHS.get(date.getMonth());
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
    $('#monthYear span').html(monthYear);
  };
  const renderActiveDate = date => {
    let today = date.getDate()
    $(`.square[data-day=${today}]`).removeClass().addClass('active')
  }
  const renderNewDate = newDate => {
    renderToday(newDate)
    renderMonthYear(newDate)
    resetTable(newDate)
    renderActiveDate(newDate)
  }
  const resetTable = newDate => {
    $('tbody').children().remove()
    generateTable(newDate)
  }

  const generateTable = date => {
    makeEmptySquares(firstDayOfMonth(date))
    makeSquares(daysOfMonth(date))
    renderActiveDate(date)
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
      $td.attr('data-day', args.get('idx')).addClass('square').html(args.get('idx'))
      $(args.get('body')).append($td)
      return args.updateIn(['idx'], idx => idx + 1)
    }
    return repeat (times) (square) (Map({idx: 1, body: $('tbody')}))
  }

  // helper functions
  const repeat = times => action => arg => {
    if (times > 0)
      return repeat (times - 1) (action) (action(arg))
    else
      return arg
  }

  // set event handlers
  const changeByDay = date => {
    const changeDate = date => e => {
      let newDate = new Date(date.getFullYear(), date.getMonth(), $(e.target).data('day'));
      renderNewDate(newDate)
    }
    // delegate handlers to container
    $('tbody').on('click', '.square', changeDate(date))
  }
  const changeByMonth = date => {
    const changeDate = (date, month) => e => {
      let newDate = new Date(date.getFullYear(), date.getMonth() + month, date.getDate());
      renderNewDate(newDate)
      resetEvent(newDate)
    }
    $('.left, .right').off()
    $('.left').click(changeDate(date, -1))
    $('.right').click(changeDate(date, 1))
  }
  const resetEvent = newDate => {
    changeByDay(newDate)
    changeByMonth(newDate)
  }

  // factory
  const initializer = date => {
    const init = date => {
      renderToday(date);
      renderMonthYear(date);
      generateTable(date);
      changeByDay(date);
      changeByMonth(date);
    };
    return {init: init}
  };

  return Object.assign({}, initializer());
})()


$(document).ready(() => {
  let date = new Date();
  Calendar.init(date)
})
