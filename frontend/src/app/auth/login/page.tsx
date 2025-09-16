"use client"

import { useState } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      window.location.href = "/memes";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="backdrop-blur-glass bg-glass-black rounded-xl p-8 border border-ashy">
          <h1 className="text-3xl font-bold text-matrix-green mb-6 text-center font-mono">
            Login
          </h1>

          {error && (
            <div className="bg-red-mirror text-white p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-matrix-green font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black border border-ashy rounded-lg p-3 text-matrix-green font-mono focus:border-red-mirror focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-matrix-green font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black border border-ashy rounded-lg p-3 text-matrix-green font-mono focus:border-red-mirror focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-mirror hover:bg-red-mirror-light disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-ashy-light">Don&apos;t have an account? </span>
            <Link href="/auth/register" className="text-matrix-green hover:text-matrix-green-dim">
              Register
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}