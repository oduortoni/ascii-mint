import Layout from "../../components/Layout";

export default function DocsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-matrix-green mb-8 font-mono">
          Documentation
        </h1>

        <div className="space-y-8">
          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">Getting Started</h2>
            <p className="text-ashy-light mb-4">
              AsciiMint allows you to create ASCII art memes with different frame styles.
            </p>
            <ol className="list-decimal list-inside text-ashy-light space-y-2">
              <li>Navigate to the <span className="text-matrix-green">Create Memes</span> page</li>
              <li>Enter your meme text in the textarea</li>
              <li>Choose a frame style (Classic, Hash, or Star)</li>
              <li>Click "Generate Preview" to see your ASCII meme</li>
            </ol>
          </section>

          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">Frame Styles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-matrix-green font-semibold mb-2">Classic (+)</h3>
                <pre className="bg-black text-matrix-green p-2 rounded text-sm border border-ashy">
{`++++++++++
+ HELLO  +
++++++++++`}
                </pre>
              </div>
              <div>
                <h3 className="text-matrix-green font-semibold mb-2">Hash (#)</h3>
                <pre className="bg-black text-matrix-green p-2 rounded text-sm border border-ashy">
{`##########
# HELLO  #
##########`}
                </pre>
              </div>
              <div>
                <h3 className="text-matrix-green font-semibold mb-2">Star (*)</h3>
                <pre className="bg-black text-matrix-green p-2 rounded text-sm border border-ashy">
{`**********
* HELLO  *
**********`}
                </pre>
              </div>
            </div>
          </section>

          <section className="backdrop-blur-glass bg-glass-black rounded-xl p-6 border border-ashy">
            <h2 className="text-2xl font-semibold text-matrix-green mb-4">API Usage</h2>
            <p className="text-ashy-light mb-4">
              You can also use our API directly to generate ASCII memes programmatically.
            </p>
            <pre className="bg-black text-matrix-green p-4 rounded-lg border border-ashy overflow-x-auto">
{`POST /api/meme/preview
Content-Type: application/json

{
  "content": "Your meme text",
  "frame": "classic"
}`}
            </pre>
          </section>
        </div>
      </div>
    </Layout>
  );
}