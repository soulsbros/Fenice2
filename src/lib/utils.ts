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

// Capitalizes the first character of a string
export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Converts and cleans up string form inputs
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

// Extracts metadata from filename (e.g. docs/pf2/Base_CoreRulebook.pdf)
export function cleanDocTitle(title: string) {
  const name = title.split("/")[2];
  return {
    title: name
      .split("_")[1]
      .slice(0, -4)
      .replaceAll(/([a-z]+)([A-Z]+)/g, "$1 $2"),
    category: name.split("_")[0],
    edition: title.split("/")[1],
  };
}

// Default values e.g. for navigation pane and redirects

export const defaultEdition = "pf2";
export const defaultCampaign = "65d8bd910444b1cacf32a09a";
