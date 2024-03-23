"use client";

import { INITIAL_EVENTS, today } from "@/lib/calendarEvents";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CalendarPage() {
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        {eventInfo.event.title}
      </>
    );
  }

  const handleEventClick = (clickInfo: any) => {
    console.info(clickInfo);
  };

  const pfMonths = [
    "Abadius",
    "Calistril",
    "Pharast",
    "Gozran",
    "Desnus",
    "Sarenith",
    "Erastus",
    "Arodus",
    "Rova",
    "Lamashan",
    "Neth",
    "Quthona",
  ];

  const pfDays = [
    "Moonday",
    "Toilday",
    "Wealday",
    "Oathday",
    "Fireday",
    "Starday",
    "Sunday",
  ];

  const formatTitle = (date: any) => {
    return pfMonths[date.date.month] + " " + (date.date.year + 2700);
  };

  const formatDayHeader = (date: any) => {
    return pfDays[date.date.marker.getDay()];
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
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
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List",
      }}
      now={today}
    />
  );
}
