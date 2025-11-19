"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function shorten() {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok) {
        // shortUrl returned by API already includes slug
        setShortUrl(`${window.location.origin}/s/${data.slug || data.shortUrl}`);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4 font-bold">URL Shortener</h1>

      <input
        className="border p-2 w-full"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={shorten}
        className={`mt-4 px-4 py-2 rounded text-white ${loading ? "bg-gray-500" : "bg-black"}`}
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {shortUrl && (
        <p className="mt-4">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {shortUrl}
          </a>
        </p>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  );
}
