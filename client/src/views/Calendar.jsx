import '@fullcalendar/react/dist/vdom';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import INITIAL_EVENTS from '../util/calendarEvents';

const Calendar = () => {
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        {eventInfo.event.title}
      </>
    );
  }

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo);
  };

  const pfMonths = [
    'Abadius',
    'Calistril',
    'Pharast',
    'Gozran',
    'Desnus',
    'Sarenith',
    'Erastus',
    'Arodus',
    'Rova',
    'Lamashan',
    'Neth',
    'Quthona',
  ];

  const pfDays = ['Moonday', 'Toilday', 'Wealday', 'Oathday', 'Fireday', 'Starday', 'Sunday'];

  const formatTitle = (date) => {
    return pfMonths[date.date.month] + ' ' + (date.date.year + 2700);
  };

  const formatDayHeader = (date) => {
    return pfDays[date.date.marker.getDay()];
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView="dayGridMonth"
      editable={false}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      dayHeaderFormat={formatDayHeader}
      initialEvents={INITIAL_EVENTS}
      titleFormat={formatTitle}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      buttonText={{
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List',
      }}
    />
  );
};

export default Calendar;
