"use client"

import { useState } from "react";
import Layout from "../../components/Layout";

export default function MemesPage() {
  const [content, setContent] = useState("");
  const [frame, setFrame] = useState("classic");
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
      const token = localStorage.getItem("token");
      
      if (!token) {
        window.location.href = "/auth/login";
        return;
      }

      const res = await fetch(`${apiUrl}/api/meme/save`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content, frame }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to save meme");
      }
      
      const data = await res.json();
      setPreview(data.rendered);
    } catch (err) {
      console.error("Error saving meme:", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-matrix-green mb-4 font-mono">
            Create ASCII Memes
          </h1>
          <p className="text-ashy-light">
            Enter your text and choose a frame style to generate your ASCII meme.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-matrix-green font-semibold mb-2">
                  Meme Text
                </label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your meme text..."
                  className="w-full bg-black border border-ashy rounded-lg p-4 text-matrix-green font-mono focus:border-ashy focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-matrix-green font-semibold mb-2">
                  Frame Style
                </label>
                <select 
                  value={frame} 
                  onChange={(e) => setFrame(e.target.value)}
                  className="w-full bg-black border border-ashy rounded-lg p-3 text-matrix-green font-mono focus:border-ashy focus:outline-none"
                >
                  <option value="classic">Classic (+)</option>
                  <option value="hash">Hash (#)</option>
                  <option value="star">Star (*)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-mirror hover:bg-red-mirror-light text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-ashy"
              >
                Create & Save Meme
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h3 className="text-matrix-green font-semibold mb-4 text-xl">
              Your Meme
            </h3>
            {preview ? (
              <pre className="bg-black text-matrix-green p-4 rounded-lg overflow-x-auto border border-ashy font-mono text-sm">
                {preview}
              </pre>
            ) : (
              <div className="bg-black border border-ashy rounded-lg p-8 text-center">
                <p className="text-ashy font-mono">
                  Your saved ASCII meme will appear here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
