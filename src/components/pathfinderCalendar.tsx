"use client";

import {
  formatDayHeader,
  formatFullDate,
  formatTitle,
} from "@/lib/calendarEvents";
import { DateInput, EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";

interface Props {
  now: DateInput;
  initialEvents: EventSourceInput;
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      {eventInfo.event.title}
    </>
  );
}

export default function PathfinderCalendar({
  now,
  initialEvents,
}: Readonly<Props>) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridWeek,dayGridMonth,listMonth",
      }}
      initialView="dayGridMonth"
      dayMaxEvents={true}
      firstDay={1}
      dayHeaderFormat={formatDayHeader}
      titleFormat={formatTitle}
      listDayFormat={formatFullDate}
      listDaySideFormat={formatDayHeader}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        list: "List",
      }}
      eventContent={renderEventContent}
      now={now}
      initialEvents={initialEvents}
    />
  );
}
