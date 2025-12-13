import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Link href="/docs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documentation
            </Link>
            
            <Badge variant="secondary" className="mb-4">Documentation</Badge>
            <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Learn how to install and set up Easyworks SheetGPT in just a few minutes.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Install the Addon
                </h2>
                <p className="text-muted-foreground mb-4">
                  Install Easyworks SheetGPT from the Google Workspace Marketplace. Click the button below to go directly to the installation page.
                </p>
                <Button asChild>
                  <a href="https://workspace.google.com/marketplace" target="_blank" rel="noopener noreferrer">
                    Install from Marketplace
                  </a>
                </Button>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Open the Addon
                </h2>
                <p className="text-muted-foreground mb-4">
                  Once installed, open any Google Sheet and navigate to:
                </p>
                <Card className="bg-muted">
                  <CardContent className="py-4">
                    <code>Extensions → Easyworks SheetGPT → Open Chat</code>
                  </CardContent>
                </Card>
                <p className="text-muted-foreground mt-4">
                  A sidebar will appear on the right side of your spreadsheet.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Configure Your API Key
                </h2>
                <p className="text-muted-foreground mb-4">
                  Click the Settings icon in the sidebar to configure your AI provider:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong>OpenAI</strong> - Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-primary hover:underline">platform.openai.com</a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong>Anthropic</strong> - Get your API key from <a href="https://console.anthropic.com" target="_blank" className="text-primary hover:underline">console.anthropic.com</a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong>Google AI</strong> - Get your API key from <a href="https://aistudio.google.com/apikey" target="_blank" className="text-primary hover:underline">aistudio.google.com</a>
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Start Using the AI
                </h2>
                <p className="text-muted-foreground mb-4">
                  You&apos;re all set! Just type your request in the chat and the AI will help you with your spreadsheet tasks.
                </p>
                <Card className="bg-muted">
                  <CardContent className="py-4 space-y-2">
                    <p className="text-sm"><strong>Try these examples:</strong></p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>&quot;Fill column B with product descriptions based on column A&quot;</li>
                      <li>&quot;Translate column C to Spanish&quot;</li>
                      <li>&quot;Summarize the data in this sheet&quot;</li>
                      <li>&quot;Create a formula to calculate the total&quot;</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between mt-16 pt-8 border-t">
              <Link href="/docs" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                Documentation
              </Link>
              <Link href="/docs/basic-usage" className="text-primary hover:underline">
                Basic Usage
                <ArrowRight className="h-4 w-4 inline ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
