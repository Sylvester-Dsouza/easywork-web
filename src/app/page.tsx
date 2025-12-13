import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  BarChart3, 
  MessageSquare, 
  Table, 
  ArrowRight,
  Check,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Google Sheets Automation
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
            Just Chat. Let AI Handle Your{" "}
            <span className="text-primary">Spreadsheet Tasks</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            The AI agent that automates your Google Sheets. Fill columns, analyze data, 
            create formulas - all through simple conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Documentation
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No credit card required • 100 free requests/month
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Automate Sheets
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make spreadsheet automation effortless
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Natural Language Chat</CardTitle>
                <CardDescription>
                  Just describe what you want in plain English. No formulas or coding required.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Table className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Bulk Operations</CardTitle>
                <CardDescription>
                  Process thousands of rows at once. Fill columns, transform data, translate content.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multiple AI Models</CardTitle>
                <CardDescription>
                  Choose from OpenAI GPT-4, Anthropic Claude, or Google Gemini. Use your own API keys.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Analysis</CardTitle>
                <CardDescription>
                  Get instant insights, summaries, and recommendations from your data.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data stays in Google Sheets. API keys are encrypted. We never store your data.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Sparkles className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Real-time Progress</CardTitle>
                <CardDescription>
                  Watch as AI processes your data with live progress indicators and status updates.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect for trying out</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> 100 requests/month</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> All AI providers</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Basic support</li>
              </ul>
              <Link href="/signup" className="block mt-6">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-primary relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For power users</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> 1,000 requests/month</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> All AI providers</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Priority support</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Usage analytics</li>
              </ul>
              <Link href="/signup?plan=pro" className="block mt-6">
                <Button className="w-full">Upgrade to Pro</Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Team Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>For organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> 5,000 requests/month</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Team management</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Dedicated support</li>
                <li className="flex items-center"><Check className="h-4 w-4 text-primary mr-2" /> Admin dashboard</li>
              </ul>
              <Link href="/signup?plan=team" className="block mt-6">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Automate Your Spreadsheets?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who save hours every week with AI-powered automation.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
