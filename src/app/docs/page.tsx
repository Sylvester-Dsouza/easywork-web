import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookOpen, Zap, Settings, MessageSquare, Code, HelpCircle } from "lucide-react";

const docs = [
  {
    title: "Getting Started",
    description: "Learn how to install and set up the addon",
    icon: Zap,
    href: "/docs/getting-started",
  },
  {
    title: "Basic Usage",
    description: "How to chat with the AI agent",
    icon: MessageSquare,
    href: "/docs/basic-usage",
  },
  {
    title: "Configuration",
    description: "Set up API keys and preferences",
    icon: Settings,
    href: "/docs/configuration",
  },
  {
    title: "API Reference",
    description: "Available commands and actions",
    icon: Code,
    href: "/docs/api-reference",
  },
  {
    title: "Examples",
    description: "Common use cases and templates",
    icon: BookOpen,
    href: "/docs/examples",
  },
  {
    title: "FAQ",
    description: "Frequently asked questions",
    icon: HelpCircle,
    href: "/docs/faq",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Documentation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn How to Use SheetGPT
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know to get started and become a power user
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {docs.map((doc) => (
              <Link key={doc.href} href={doc.href}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <doc.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-24 bg-muted/50 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Quick Start Guide</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Install the Addon</h3>
                <p className="text-muted-foreground mb-4">
                  Install Easyworks SheetGPT from the Google Workspace Marketplace.
                </p>
                <Button asChild>
                  <a href="https://workspace.google.com/marketplace" target="_blank">
                    Install from Marketplace
                  </a>
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">2. Open the Addon</h3>
                <p className="text-muted-foreground">
                  In any Google Sheet, go to <code className="bg-muted px-2 py-1 rounded">Extensions → Easyworks SheetGPT → Open Chat</code>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">3. Add Your API Key</h3>
                <p className="text-muted-foreground">
                  Click Settings and add your OpenAI, Anthropic, or Google AI API key.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">4. Start Chatting!</h3>
                <p className="text-muted-foreground">
                  Just describe what you want to do in plain English. For example:
                </p>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>&quot;Fill column B with product descriptions based on column A&quot;</li>
                  <li>&quot;Translate column C to Spanish&quot;</li>
                  <li>&quot;Summarize the data in this sheet&quot;</li>
                  <li>&quot;Create a formula to calculate the total in column D&quot;</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
