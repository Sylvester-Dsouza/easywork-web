import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const releases = [
  {
    version: "1.2.0",
    date: "December 2024",
    changes: [
      "Added Google Gemini 2.0 Flash support",
      "Improved progress indicators with done/failed/pending stats",
      "Enhanced data scanning to process all rows",
      "Better error handling and retry logic",
    ],
  },
  {
    version: "1.1.0",
    date: "November 2024",
    changes: [
      "Added Anthropic Claude support",
      "New bulk operations for faster processing",
      "Improved formula generation",
      "Fixed translation accuracy issues",
    ],
  },
  {
    version: "1.0.0",
    date: "October 2024",
    changes: [
      "Initial release",
      "OpenAI GPT-4 integration",
      "Natural language chat interface",
      "Basic cell operations (read, write, fill)",
      "Settings panel for API key management",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Changelog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What&apos;s New
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay up to date with the latest features and improvements
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {releases.map((release) => (
              <Card key={release.version}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge>v{release.version}</Badge>
                    <CardDescription>{release.date}</CardDescription>
                  </div>
                  <CardTitle className="text-xl mt-2">Version {release.version}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {release.changes.map((change, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
