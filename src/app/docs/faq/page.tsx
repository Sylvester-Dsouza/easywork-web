import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    question: "What counts as a request?",
    answer: "Each message you send to the AI agent counts as one request. Bulk operations that process multiple rows still count as a single request, making it very cost-effective for large datasets.",
  },
  {
    question: "Can I use my own API keys?",
    answer: "Yes! You can use your own OpenAI, Anthropic, or Google API keys. This way you only pay for what you use directly to the AI provider, and your usage doesn't count against your SheetGPT plan limits.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Your spreadsheet data is never stored on our servers. Data is processed in real-time and sent directly to the AI provider you choose. API keys are encrypted using AES-256 encryption.",
  },
  {
    question: "What happens if I exceed my limit?",
    answer: "You'll receive a notification when you're close to your limit. Once reached, you can upgrade your plan or wait for the next billing cycle. Your data and settings remain intact.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time from your dashboard. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Which AI model should I use?",
    answer: "GPT-4o is great for general tasks. Claude 3.5 Sonnet excels at detailed analysis. Gemini 2.0 Flash is fastest and most cost-effective. We recommend starting with Gemini for speed, then trying others based on your needs.",
  },
  {
    question: "Does it work with Google Sheets formulas?",
    answer: "Yes! The AI can create, modify, and explain Google Sheets formulas. Just describe what you want to calculate and it will generate the appropriate formula.",
  },
  {
    question: "Can I process thousands of rows?",
    answer: "Yes, SheetGPT is designed for bulk operations. It reads all your data and processes it efficiently. Progress indicators show you exactly how many rows have been processed.",
  },
  {
    question: "What languages are supported?",
    answer: "The AI can work with content in 100+ languages. It can translate between languages, generate content in specific languages, and understand multilingual data.",
  },
  {
    question: "How do I get support?",
    answer: "Free users get email support with 24-hour response time. Pro users get priority support. Team and Enterprise users get dedicated support channels.",
  },
];

export default function FaqPage() {
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
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about SheetGPT.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t text-center">
              <p className="text-muted-foreground mb-4">
                Still have questions? We&apos;re here to help.
              </p>
              <Link href="/support" className="text-primary hover:underline">
                Contact Support →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
