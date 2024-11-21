export const GOLARION_MONTHS = [
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

export const GOLARION_DAYS = [
  "Sunday",
  "Moonday",
  "Toilday",
  "Wealday",
  "Oathday",
  "Fireday",
  "Starday",
];

const EVENT_COLORS = {
  lenior: "#ffb300",
};

export function formatTitle(date: any) {
  return `${GOLARION_MONTHS[date.date.month]} ${date.date.year + 2700}`;
}

export function formatDayHeader(date: any) {
  return GOLARION_DAYS[date.date.marker.getDay()];
}

export function formatFullDate(date: any) {
  return `${date.date.day} ${GOLARION_MONTHS[date.date.month]} ${date.date.year + 2700}`;
}

// Fetches the date of our next session from our shared calendar.
// Uses https://github.com/Steeven9/Gcal-API
export async function fetchNextSession(): Promise<string | undefined> {
  try {
    const res = await fetch(process.env.GCAL_API_URL!, { cache: "no-store" });
    const data = await res.json();
    // filter out birthdays (which are in the same calendar) and return first result
    return data.filter((event: any) => !event.title.includes("Compleanno"))[0]
      ?.startTime;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

// Dark Age

export const CURRENT_DATE_DA = "2022-11-17T00:00:00";

export const EVENTS_DA = [
  {
    title: "Arrived at Voluse",
    start: "2022-08-17",
  },
  {
    title: "Arrived at Hajoth Hakados",
    start: "2022-09-14",
  },
  {
    title: "The Algamat War",
    start: "2022-10-18",
  },
];

// Avalor

export const CURRENT_DATE_AVALOR = "2024-08-28T00:00:00";

// note: end should be day + 1 (exclusive)
export const EVENTS_AVALOR = [
  // Lenior
  //TODO add books, anniversaries, etc.
  // Guards/plot events
  {
    title: "Joined the guards",
    start: "2024-07-24",
  },
  {
    title: "Feather case",
    start: "2024-07-25",
  },
  {
    title: "Change of groups, barracks evacuation",
    start: "2024-07-26",
  },
  {
    title: "Druids case",
    start: "2024-08-03",
  },
  {
    title: "Serolk Muthar captured; instructors choice",
    start: "2024-08-04",
  },
  {
    title: "Rauatai case",
    start: "2024-08-25",
  },
  {
    title: "Looking for Mahoa",
    start: "2024-08-26",
  },
  {
    title: "Meeting with Alar, kicked from guards",
    start: "2024-08-27",
  },
  {
    title: "Neketaka",
    start: "2024-08-27",
    end: "2024-08-29",
  },
];
