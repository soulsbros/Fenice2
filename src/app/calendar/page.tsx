import { redirect } from "next/navigation";

export default async function CalendarRootPage() {
  redirect(`/calendar/sessions`);
}
