import { redirect } from "next/navigation";

const defaultEdition = "pf2";

export default async function Documents() {
  redirect(`documents/${defaultEdition}`);
}
