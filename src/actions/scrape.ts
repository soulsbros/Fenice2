"use server";

import { StatResult } from "@/types/Initiative";
import * as cheerio from "cheerio";

function cleanStat(raw: string) {
  return raw.replace(/^\+/, "").replace(/;\s*$/, "").trim();
}

export async function scrapeMonster(url: string): Promise<StatResult> {
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Cannot fetch data from URL", url);
    return {};
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const block = $("#ctl00_RadDrawer1_Content_MainContent_DetailedOutput");
  if (!block.length) {
    console.error("Stat block not found", url);
    return {};
  }

  const extract = (label: string) => {
    const b = block.find("b").filter((_, el) => $(el).text().trim() === label);
    if (!b.length || !b[0].nextSibling) return "";
    return $(b[0].nextSibling).text().trim();
  };

  const name = $(
    "#ctl00_RadDrawer1_Content_MainContent_DetailedOutput > h1.title"
  )
    .contents()
    .filter((_, el) => el.type === "text")
    .text()
    .trim();

  return {
    name,
    perception: cleanStat(extract("Perception")),
    AC: cleanStat(extract("AC")),
    HP: cleanStat(extract("HP")),
  };
}
