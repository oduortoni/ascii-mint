"use client";

import Link from "next/link";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <h1 className="text-6xl font-bold mb-6 text-matrix-green font-mono">
          AsciiMint
        </h1>
        <p className="text-lg text-ashy-light mb-12 text-center max-w-2xl leading-relaxed">
          Welcome to <span className="text-matrix-green">AsciiMint</span> — a nerdy
          playground where memes are minted in text. Choose a frame, type your
          message, and turn it into retro ASCII art. Simple, fun, and geeky.
        </p>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full mb-12">
          <div className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="font-semibold text-xl mb-4 text-matrix-green">Example Meme</h2>
            <pre className="bg-black text-matrix-green p-4 rounded-lg overflow-x-auto border border-red-mirror">
{`###################
#  HODL THE LINE  #
#   TO THE MOON   #
###################`}
            </pre>
          </div>
          <div className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="font-semibold text-xl mb-4 text-matrix-green">Example Banner</h2>
            <pre className="bg-black text-matrix-green p-4 rounded-lg overflow-x-auto border border-red-mirror">
{`***********************
*   ASCII FOREVER     *
***********************`}
            </pre>
          </div>
        </div>

        <Link
          href="/memes"
          className="bg-glass-black border-matrix-green hover:text-matrix-green text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 border border-ashy"
        >
          Start Creating →
        </Link>
      </div>
    </Layout>
  );
}
