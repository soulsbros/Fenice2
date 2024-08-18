import Swal, { SweetAlertOptions } from "sweetalert2";

export async function showAlert(options: SweetAlertOptions) {
  return Swal.fire({
    icon: "info",
    reverseButtons: true,
    showCancelButton: true,
    confirmButtonColor: "#DC2626",
    ...options,
  });
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseFormData(
  form: FormData,
  key: string,
  shouldCapitalize = false
) {
  let string = form.get(key)?.toString().trim() ?? "";
  if (shouldCapitalize) {
    return capitalize(string);
  } else {
    return string;
  }
}

export async function playTTS(message: string) {
  if (!process.env.TTS_URL) {
    console.error("Error: TTS URL is not defined!");
    return;
  }
  await fetch(process.env.TTS_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: `{"message": "${message}", "target": "media_player.d_d_table"}`,
  });
}

// Default values e.g. for navigation pane

export const defaultEdition = "pf2";

export async function getDefaultCampaign() {
  return "65d8bd910444b1cacf32a09a";
}
