'use server';

import * as cheerio from 'cheerio';

export type StatResult = {
  name: string | null;
  Perception: string | null;
  AC: string | null;
  HP: string | null;
};

function cleanStat(raw: string | null): string | null {
  if (!raw) return null;

  return raw
    .replace(/^\+/, '')
    .replace(/;\s*$/, '')                          
    .trim();
}


export async function scrapeMonster(url: string): Promise<StatResult> {
  if (!url.startsWith('https://2e.aonprd.com')) {
    throw new Error('Invalid URL');
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch page');

  const html = await res.text();
  const $ = cheerio.load(html);

  const block = $('#ctl00_RadDrawer1_Content_MainContent_DetailedOutput');
  if (!block.length) throw new Error('Stat block not found');

  const extract = (label: string): string | null => {
    const b = block.find('b').filter((_, el) => $(el).text().trim() === label);
    if (!b.length || !b[0].nextSibling) return null;
    return $(b[0].nextSibling).text().trim() || null;
  };

  const name = $('#ctl00_RadDrawer1_Content_MainContent_DetailedOutput > h1.title')
  .contents()
  .filter((_, el) => el.type === 'text')
  .text()
  .trim() || null;


  return {
    name,
    Perception: cleanStat(extract('Perception')),
    AC: cleanStat(extract('AC')),
    HP: cleanStat(extract('HP')),
  };
}
