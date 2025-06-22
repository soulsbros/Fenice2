"use client";

import { scrapeMonster } from "@/actions/scrape";
import { useState } from "react";

type StatResult = {
  name: string | null;
  Perception: string | null;
  AC: string | null;
  HP: string | null;
};

export default function TestScrape() {
  const [url, setUrl] = useState("");
  const [stats, setStats] = useState<StatResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    setLoading(true);
    setError("");
    setStats(null);

    try {
      const result = await scrapeMonster(url);
      setStats(result);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Monster Stat Scraper</h2>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Enter a 2e.aonprd.com monster URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleScrape}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Scraping…" : "Scrape Stats"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {stats && (
        <div className="mt-6 space-y-2">
          <h3 className="text-xl font-bold">{stats.name}</h3>
          <p>
            <strong>Perception:</strong> {stats.Perception ?? "N/A"}
          </p>
          <p>
            <strong>AC:</strong> {stats.AC ?? "N/A"}
          </p>
          <p>
            <strong>HP:</strong> {stats.HP ?? "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
