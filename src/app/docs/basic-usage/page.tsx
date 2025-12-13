import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BasicUsagePage() {
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
            <h1 className="text-4xl font-bold mb-4">Basic Usage</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Learn how to effectively chat with the AI agent to automate your spreadsheet tasks.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground mb-4">
                  SheetGPT reads your spreadsheet data and understands its structure. When you send a message, the AI analyzes your request and performs the appropriate actions on your data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Writing Effective Prompts</h2>
                <p className="text-muted-foreground mb-4">
                  The key to getting great results is being clear and specific about what you want. Here are some tips:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>Be specific:</strong> Instead of &quot;fill the column&quot;, say &quot;fill column B with product descriptions&quot;</li>
                  <li><strong>Reference columns:</strong> Use column letters (A, B, C) or header names</li>
                  <li><strong>Describe the output:</strong> Explain what format or style you want</li>
                  <li><strong>Give examples:</strong> If needed, provide an example of the desired output</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Common Tasks</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Filling Columns</h3>
                    <Card className="bg-muted">
                      <CardContent className="py-4">
                        <p className="text-sm mb-2"><strong>Example:</strong></p>
                        <code className="text-sm">&quot;Fill column B with short product descriptions based on the product names in column A&quot;</code>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Translation</h3>
                    <Card className="bg-muted">
                      <CardContent className="py-4">
                        <p className="text-sm mb-2"><strong>Example:</strong></p>
                        <code className="text-sm">&quot;Translate all text in column C from English to Spanish&quot;</code>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
                    <Card className="bg-muted">
                      <CardContent className="py-4">
                        <p className="text-sm mb-2"><strong>Example:</strong></p>
                        <code className="text-sm">&quot;Summarize the sales data and identify the top 5 performing products&quot;</code>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Formula Creation</h3>
                    <Card className="bg-muted">
                      <CardContent className="py-4">
                        <p className="text-sm mb-2"><strong>Example:</strong></p>
                        <code className="text-sm">&quot;Create a formula in D2 that calculates the total of columns B and C&quot;</code>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data Cleaning</h3>
                    <Card className="bg-muted">
                      <CardContent className="py-4">
                        <p className="text-sm mb-2"><strong>Example:</strong></p>
                        <code className="text-sm">&quot;Clean up the email addresses in column E - fix formatting and remove invalid entries&quot;</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Understanding Progress</h2>
                <p className="text-muted-foreground mb-4">
                  When the AI processes your request, you&apos;ll see a progress indicator showing:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Done:</strong> Successfully completed actions</li>
                  <li><strong>Failed:</strong> Actions that encountered errors</li>
                  <li><strong>Rows updated:</strong> Total number of cells modified</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between mt-16 pt-8 border-t">
              <Link href="/docs/getting-started" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                Getting Started
              </Link>
              <Link href="/docs/configuration" className="text-primary hover:underline">
                Configuration
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
