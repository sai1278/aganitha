"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function shorten() {
    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    setShortUrl(`${window.location.origin}/${data.shortUrl}`);
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
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Shorten
      </button>

      {shortUrl && (
        <p className="mt-4">
          Short URL:{" "}
          <a className="text-blue-600 underline" href={shortUrl}>
            {shortUrl}
          </a>
        </p>
      )}
    </main>
  );
}
