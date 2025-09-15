"use client"

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [frame, setFrame] = useState("classic");
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9000/api/meme/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, frame }),
      });
      const data = await res.json();
      setPreview(data.preview);
    } catch (err) {
      console.error("Error fetching preview:", err);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>AsciiMint</h1>
      <p>Create your ASCII meme, nerd style.</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your meme text..."
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>
          Frame style:{" "}
          <select value={frame} onChange={(e) => setFrame(e.target.value)}>
            <option value="classic">Classic (+)</option>
            <option value="hash">Hash (#)</option>
            <option value="star">Star (*)</option>
          </select>
        </label>

        <div>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Preview
          </button>
        </div>
      </form>

      {preview && (
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {preview}
        </pre>
      )}
    </main>
  );
}
