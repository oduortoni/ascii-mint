import Link from "next/link";

export default function Footer() {
  return (
    <footer className="backdrop-blur-glass bg-glass-black border-t border-ashy mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-matrix-green font-mono">
            © 2025 AsciiMint
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/oduortoni/ascii-mint" target="_blank" rel="noopener noreferrer" className="text-ashy hover:text-matrix-green transition-colors">
              GitHub
            </a>
            <Link href="/docs" className="text-ashy hover:text-matrix-green transition-colors">
              Docs
            </Link>
            <Link href="/api" className="text-ashy hover:text-matrix-green transition-colors">
              API
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}