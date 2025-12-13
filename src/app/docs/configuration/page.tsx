import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

export default function ConfigurationPage() {
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
            <h1 className="text-4xl font-bold mb-4">Configuration</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Set up your API keys and customize your SheetGPT experience.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Accessing Settings</h2>
                <p className="text-muted-foreground mb-4">
                  Click the ⚙️ Settings link in the sidebar to open the configuration panel.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">AI Provider Selection</h2>
                <p className="text-muted-foreground mb-4">
                  Choose from three AI providers, each with their own strengths:
                </p>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold mb-2">OpenAI (GPT-4)</h3>
                      <p className="text-sm text-muted-foreground mb-2">Best for: General tasks, content generation, complex reasoning</p>
                      <p className="text-sm text-muted-foreground">Models: GPT-4o, GPT-4o Mini, GPT-4 Turbo</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold mb-2">Anthropic (Claude)</h3>
                      <p className="text-sm text-muted-foreground mb-2">Best for: Long documents, detailed analysis, safety-focused tasks</p>
                      <p className="text-sm text-muted-foreground">Models: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold mb-2">Google (Gemini)</h3>
                      <p className="text-sm text-muted-foreground mb-2">Best for: Fast responses, cost-effective processing</p>
                      <p className="text-sm text-muted-foreground">Models: Gemini 2.0 Flash, Gemini 1.5 Pro, Gemini 1.5 Flash</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Getting API Keys</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">OpenAI</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                      <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
                      <li>Sign in or create an account</li>
                      <li>Click &quot;Create new secret key&quot;</li>
                      <li>Copy the key and paste it in SheetGPT settings</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Anthropic</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                      <li>Go to <a href="https://console.anthropic.com" target="_blank" className="text-primary hover:underline">console.anthropic.com</a></li>
                      <li>Sign in or create an account</li>
                      <li>Navigate to API Keys section</li>
                      <li>Create a new key and copy it</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Google AI</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                      <li>Go to <a href="https://aistudio.google.com/apikey" target="_blank" className="text-primary hover:underline">aistudio.google.com/apikey</a></li>
                      <li>Sign in with your Google account</li>
                      <li>Click &quot;Create API Key&quot;</li>
                      <li>Copy the key and paste it in SheetGPT settings</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Security</h2>
                <Card className="border-yellow-500/50 bg-yellow-500/10">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-600">Keep your API keys secure</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your API keys are encrypted and stored securely. Never share your API keys with others. You can delete or rotate your keys at any time from your provider&apos;s dashboard.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between mt-16 pt-8 border-t">
              <Link href="/docs/basic-usage" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                Basic Usage
              </Link>
              <Link href="/docs/api-reference" className="text-primary hover:underline">
                API Reference
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
