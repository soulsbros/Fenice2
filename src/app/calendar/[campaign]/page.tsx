"use client";

import LinkButtons from "@/components/linkButtons";
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
import { notFound } from "next/navigation";

export default function CalendarPage({
  params,
}: Readonly<{
  params: { campaign: string };
}>) {
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

  const links = [
    { name: "Dark Age", url: "/calendar/darkAge" },
    { name: "Sessions", url: "/calendar/sessions" },
  ];

  if (params.campaign == "darkAge") {
    return (
      <>
        <LinkButtons selected={params.campaign} links={links} />
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
      </>
    );
  }

  if (params.campaign == "sessions") {
    return (
      <>
        <LinkButtons selected={params.campaign} links={links} />
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FZurich&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&src=ZWQ3OTNmMTM1MTIwODc5YTQ4ZjE5OWE4OWZlOTc5ZjFlYjk1NGZhY2U4NDgzNDc5YWU0ODg4ZGQxNDYyOGIwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33"
          width="100%"
          height="90%"
          title="Calendar"
        ></iframe>
      </>
    );
  }

  return notFound();
}
