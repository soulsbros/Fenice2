import PathfinderCalendar from "@/components/pathfinderCalendar";
import Select from "@/components/select";
import {
  CURRENT_DATE_AVALOR,
  CURRENT_DATE_DA,
  EVENTS_AVALOR,
  EVENTS_DA,
} from "@/lib/calendarEvents";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { campaign: string };
}

const links = [
  { name: "Avalor", url: "avalor" },
  { name: "Dark Age", url: "darkAge" },
  { name: "Sessions", url: "sessions" },
];

export function generateMetadata({ params }: Props): Metadata {
  const title = `Calendar ${capitalize(links.filter((link) => link.url == params.campaign)[0]?.name || "")}`;
  return {
    title: title,
    openGraph: {
      title: title,
    },
  };
}

export default function CalendarPage({ params }: Readonly<Props>) {
  if (!links.find((link) => link.url == params.campaign)) {
    notFound();
  }

  return (
    <>
      <div className="title">
        Calendar{" "}
        <Select
          redirectPath="/calendar"
          selectedItem={params.campaign}
          options={links.map((el) => {
            return { name: el.name, value: el.url };
          })}
        />
      </div>

      {params.campaign == "darkAge" ? (
        <PathfinderCalendar now={CURRENT_DATE_DA} initialEvents={EVENTS_DA} />
      ) : null}
      {params.campaign == "avalor" ? (
        <PathfinderCalendar
          now={CURRENT_DATE_AVALOR}
          initialEvents={EVENTS_AVALOR}
        />
      ) : null}
      {params.campaign == "sessions" ? (
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FZurich&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&src=ZWQ3OTNmMTM1MTIwODc5YTQ4ZjE5OWE4OWZlOTc5ZjFlYjk1NGZhY2U4NDgzNDc5YWU0ODg4ZGQxNDYyOGIwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33"
          width="100%"
          height="90%"
          title="Calendar"
        ></iframe>
      ) : null}
    </>
  );
}
