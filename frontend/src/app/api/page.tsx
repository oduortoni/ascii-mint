import Layout from "../../components/Layout";

export default function APIPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-matrix-green mb-8 font-mono">
          API Reference
        </h1>

        <div className="space-y-8">
          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">Base URL</h2>
            <pre className="bg-black text-matrix-green p-4 rounded-lg border border-ashy">
              http://localhost:9000
            </pre>
          </section>

          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">Endpoints</h2>
            
            <div className="space-y-6">
              <div className="border border-ashy rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-ashy text-white px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-matrix-green font-mono">/api/meme/preview</code>
                </div>
                <p className="text-ashy-light mb-4">Generate ASCII meme preview</p>
                
                <h4 className="text-matrix-green font-semibold mb-2">Request Body:</h4>
                <pre className="bg-black text-matrix-green p-3 rounded text-sm border border-ashy mb-4">
{`{
  "content": "string",  // Your meme text
  "frame": "string"     // "classic", "hash", or "star"
}`}
                </pre>

                <h4 className="text-matrix-green font-semibold mb-2">Response:</h4>
                <pre className="bg-black text-matrix-green p-3 rounded text-sm border border-ashy mb-4">
{`{
  "preview": "string"   // ASCII art meme
}`}
                </pre>

                <h4 className="text-matrix-green font-semibold mb-2">Example:</h4>
                <pre className="bg-black text-matrix-green p-3 rounded text-sm border border-ashy">
{`curl -X POST http://localhost:9000/api/meme/preview \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "HELLO WORLD",
    "frame": "classic"
  }'`}
                </pre>
              </div>
            </div>
          </section>

          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">Frame Types</h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <code className="text-matrix-green bg-black px-2 py-1 rounded">"classic"</code>
                <span className="text-ashy-light">Uses + characters for borders</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-matrix-green bg-black px-2 py-1 rounded">"hash"</code>
                <span className="text-ashy-light">Uses # characters for borders</span>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-matrix-green bg-black px-2 py-1 rounded">"star"</code>
                <span className="text-ashy-light">Uses * characters for borders</span>
              </div>
            </div>
          </section>

          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">Error Responses</h2>
            <div className="space-y-4">
              <div>
                <code className="text-ashy">400 Bad Request</code>
                <p className="text-ashy-light mt-1">Invalid JSON or missing required fields</p>
              </div>
              <div>
                <code className="text-ashy">405 Method Not Allowed</code>
                <p className="text-ashy-light mt-1">Only POST method is supported</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}