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

export function formatTitle(date: any) {
  return `${GOLARION_MONTHS[date.date.month]} ${date.date.year + 2700}`;
}

export function formatDayHeader(date: any) {
  return GOLARION_DAYS[date.date.marker.getDay()];
}

export function formatFullDate(date: any) {
  return `${date.date.marker.getDay()} ${GOLARION_MONTHS[date.date.month]} ${date.date.year + 2700}`;
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

export const EVENTS_AVALOR = [
  {
    title: "Arruolati nelle guardie",
    start: "2024-07-24",
  },
  {
    title: "Caso piuma",
    start: "2024-07-25",
  },
  {
    title: "Cambio gruppi, evacuazione barracks",
    start: "2024-07-26",
  },
  {
    title: "Caso druido nel Verdant Ward",
    start: "2024-08-03",
  },
  {
    title: "Consegna di Serolk Muthar alle guardie; scelta degli istruttori",
    start: "2024-08-04",
  },
  {
    title: "Caso Rauatai",
    start: "2024-08-25",
  },
  {
    title: "Ricerca di Mahoa",
    start: "2024-08-26",
  },
  {
    title: "Incontro con Alar, espulsione dalle guardie",
    start: "2024-08-27",
  },
  {
    title: "Neketaka",
    start: "2024-08-27",
    // end should be day + 1
    end: "2024-08-29",
  },
];
