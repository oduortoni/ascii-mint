"use client"

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-glass bg-glass-black border-b border-ashy">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-matrix-green">
            AsciiMint
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-matrix-green hover:text-matrix-green-dim transition-colors">
              Home
            </Link>
            <Link href="/memes" className="text-matrix-green hover:text-matrix-green-dim transition-colors">
              Create Memes
            </Link>
            <Link href="/my-memes" className="text-matrix-green hover:text-matrix-green-dim transition-colors">
              My Memes
            </Link>
            <Link href="/docs" className="text-matrix-green hover:text-matrix-green-dim transition-colors">
              Docs
            </Link>
            <Link href="/api" className="text-matrix-green hover:text-matrix-green-dim transition-colors">
              API
            </Link>
            <Link href="/auth/login" className="text-matrix-green hover:text-matrix-green-dim transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-matrix-green hover:text-matrix-green-dim"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-ashy">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-matrix-green hover:text-matrix-green-dim transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/memes"
                className="block px-3 py-2 text-matrix-green hover:text-matrix-green-dim transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create Memes
              </Link>
              <Link
                href="/my-memes"
                className="block px-3 py-2 text-matrix-green hover:text-matrix-green-dim transition-colors"
                onClick={() => setIsOpen(false)}
              >
                My Memes
              </Link>
              <Link
                href="/docs"
                className="block px-3 py-2 text-matrix-green hover:text-matrix-green-dim transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/api"
                className="block px-3 py-2 text-matrix-green hover:text-matrix-green-dim transition-colors"
                onClick={() => setIsOpen(false)}
              >
                API
              </Link>
              <Link
                href="/auth/login"
                className="block px-3 py-2 text-matrix-green hover:text-matrix-green-dim transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}