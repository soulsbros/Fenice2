import icon from "@/img/icon.png";
import iconPride from "@/img/iconPride.png";
import iconSummer from "@/img/iconSummer.png";
import iconXmas from "@/img/iconXmas.png";
import loading from "@/img/loading.gif";
import loadingPride from "@/img/loadingPride.gif";
import loadingSummer from "@/img/loadingSummer.gif";
import loadingXmas from "@/img/loadingXmas.gif";
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

// Extracts metadata from filename (e.g. sounds/Yeet.mp3)
export function cleanSoundTitle(title: string) {
  const name = title.split("/")[1];
  return {
    title: name.slice(0, -4).replaceAll(/([a-z]+)([A-Z]+)/g, "$1 $2"),
  };
}

export function getLogo() {
  const now = new Date();
  if (now.getMonth() == 5) {
    // june
    return { icon: iconPride, loading: loadingPride };
  }
  if (now.getMonth() == 6 || now.getMonth() == 7) {
    // july, august
    return { icon: iconSummer, loading: loadingSummer };
  }
  if (now.getMonth() == 11 || now.getMonth() == 0) {
    // december, january
    return { icon: iconXmas, loading: loadingXmas };
  }
  return { icon: icon, loading: loading };
}

// Default values e.g. for navigation pane and redirects

export const defaultEdition = "pf2";
export const defaultCampaign = "6697e5deda0f1caafa40e160";
export const baseTitle = "La Compagnia della Fenice";
export const baseDesc =
  "Our D&D website with manuals, characters, and much more!";
export const baseUrl = new URL("https://fenice2.soulsbros.ch");
