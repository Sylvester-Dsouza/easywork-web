import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  MessageSquare, 
  Table, 
  Zap, 
  BarChart3, 
  Shield, 
  Sparkles,
  Globe,
  FileText,
  Calculator,
  RefreshCw,
  Users,
  Lock,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Chat",
    description: "Just describe what you want in plain English. No formulas, no coding, no complex menus. Simply chat with the AI and watch it work.",
  },
  {
    icon: Table,
    title: "Bulk Operations",
    description: "Process thousands of rows at once. Fill columns, transform data, clean up messy spreadsheets - all in a single command.",
  },
  {
    icon: Zap,
    title: "Multiple AI Models",
    description: "Choose from OpenAI GPT-4, Anthropic Claude, or Google Gemini. Use your own API keys for maximum flexibility and control.",
  },
  {
    icon: BarChart3,
    title: "Smart Analysis",
    description: "Get instant insights, summaries, and recommendations from your data. Ask questions and get answers in seconds.",
  },
  {
    icon: Globe,
    title: "Translation",
    description: "Translate content across 100+ languages. Perfect for international teams and multilingual content.",
  },
  {
    icon: FileText,
    title: "Content Generation",
    description: "Generate product descriptions, marketing copy, emails, and more based on your existing data.",
  },
  {
    icon: Calculator,
    title: "Formula Creation",
    description: "Describe what you want to calculate and let AI create the perfect formula for you.",
  },
  {
    icon: RefreshCw,
    title: "Data Transformation",
    description: "Clean, format, and transform data automatically. Fix dates, standardize formats, remove duplicates.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays in Google Sheets. We never store your spreadsheet data. API keys are encrypted.",
  },
  {
    icon: Sparkles,
    title: "Real-time Progress",
    description: "Watch as AI processes your data with live progress indicators showing done, pending, and failed tasks.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share access with your team. Manage permissions and track usage across your organization.",
  },
  {
    icon: Lock,
    title: "Enterprise Ready",
    description: "SOC 2 compliant, GDPR ready, with SSO support for enterprise customers.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Automate Sheets
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI features that make spreadsheet automation effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-24 bg-muted/50 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who save hours every week with AI-powered automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
