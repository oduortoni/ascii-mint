"use client"

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";

interface Meme {
  _id: string;
  owner?: string;
  content: string;
  frame: string;
  rendered: string;
  sha256?: string;
  createdAt: string;
}

export default function MyMemesPage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/auth/login";
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
      const res = await fetch(`${apiUrl}/api/meme/list`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch memes");
      }

      const data = await res.json();
      setMemes(data.memes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch memes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="text-matrix-green font-mono">Loading your memes...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-matrix-green mb-8 font-mono">
          My Memes
        </h1>

        {error && (
          <div className="bg-red-mirror text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {memes.length === 0 ? (
          <div className="backdrop-blur-glass bg-glass-black rounded-xl p-8 border border-ashy text-center">
            <p className="text-ashy-light mb-4">You haven&apos;t created any memes yet.</p>
            <a
              href="/memes"
              className="bg-red-mirror hover:bg-red-mirror-light text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Create Your First Meme
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {memes.map((meme, index) => (
              <div
                key={meme._id || `meme-${index}`}
                className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy"
              >
                <div className="mb-4">
                  <span className="text-matrix-green text-sm font-semibold">
                    {meme.frame?.toUpperCase() || 'UNKNOWN'} FRAME
                  </span>
                  <span className="text-ashy-light text-sm ml-2">
                    {new Date(meme.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <pre className="bg-black text-matrix-green p-4 rounded-lg overflow-x-auto border border-ashy font-mono text-sm mb-4">
                  {meme.rendered}
                </pre>
                
                <div className="text-ashy-light text-sm">
                  <strong>Content:</strong> {meme.content || 'No content'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}