"use client";

import {
  CURRENT_DATE_DA,
  EVENTS_DA,
  GOLARION_DAYS,
  GOLARION_MONTHS,
} from "@/lib/calendarEvents";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

export default function CalendarPage() {
  const [showSessions, setShowSessions] = useState(false);

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

  const formatTitle = (date: any) => {
    return GOLARION_MONTHS[date.date.month] + " " + (date.date.year + 2700);
  };

  const formatDayHeader = (date: any) => {
    return GOLARION_DAYS[date.date.marker.getDay()];
  };

  //TODO make it compatible with more sessions and use buttons like the Map

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={showSessions}
          className="sr-only peer"
          onChange={(e) => setShowSessions(e.target.checked)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        <span className="ms-3">Show sessions</span>
      </label>

      {showSessions ? (
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FZurich&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&src=ZWQ3OTNmMTM1MTIwODc5YTQ4ZjE5OWE4OWZlOTc5ZjFlYjk1NGZhY2U4NDgzNDc5YWU0ODg4ZGQxNDYyOGIwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33"
          width="100%"
          height="600"
          title="Calendar"
        ></iframe>
      ) : (
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
          initialEvents={EVENTS_DA}
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
          now={CURRENT_DATE_DA}
          firstDay={1}
        />
      )}
    </>
  );
}
