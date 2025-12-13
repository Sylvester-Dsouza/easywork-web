import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight } from "lucide-react";

const examples = [
  {
    title: "Generate Product Descriptions",
    prompt: "Fill column B with short, compelling product descriptions based on the product names in column A. Keep each description under 100 words.",
    result: "The AI reads all product names and generates unique descriptions for each one.",
  },
  {
    title: "Translate Content",
    prompt: "Translate all the text in column C from English to Spanish. Keep the same formatting.",
    result: "All text in column C is translated while preserving any formatting or special characters.",
  },
  {
    title: "Extract Email Domains",
    prompt: "For each email address in column A, extract just the domain name and put it in column B.",
    result: "Extracts domains like 'gmail.com', 'company.org' from full email addresses.",
  },
  {
    title: "Categorize Data",
    prompt: "Look at the product names in column A and categorize them into Electronics, Clothing, Food, or Other in column B.",
    result: "AI analyzes each product and assigns an appropriate category.",
  },
  {
    title: "Generate SEO Titles",
    prompt: "Create SEO-optimized titles for the blog posts listed in column A. Put the titles in column B. Include relevant keywords.",
    result: "Creates engaging, keyword-rich titles optimized for search engines.",
  },
  {
    title: "Calculate Formulas",
    prompt: "Create a formula in column D that calculates the profit margin: (column C - column B) / column C * 100",
    result: "Adds a formula that calculates profit margin percentage for each row.",
  },
  {
    title: "Clean Phone Numbers",
    prompt: "Standardize all phone numbers in column A to the format (XXX) XXX-XXXX",
    result: "Reformats various phone number formats into a consistent style.",
  },
  {
    title: "Summarize Reviews",
    prompt: "Summarize each customer review in column A into a one-sentence summary in column B. Also add a sentiment (Positive/Negative/Neutral) in column C.",
    result: "Creates concise summaries and sentiment analysis for each review.",
  },
];

export default function ExamplesPage() {
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
            <h1 className="text-4xl font-bold mb-4">Examples</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Common use cases and prompt templates to help you get started.
            </p>

            <div className="space-y-6">
              {examples.map((example, index) => (
                <Card key={index}>
                  <CardContent className="py-6">
                    <h3 className="font-semibold text-lg mb-3">{example.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Prompt:</p>
                        <div className="bg-muted rounded p-3">
                          <code className="text-sm">&quot;{example.prompt}&quot;</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Result:</p>
                        <p className="text-sm text-muted-foreground">{example.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between mt-16 pt-8 border-t">
              <Link href="/docs/api-reference" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                API Reference
              </Link>
              <Link href="/docs/faq" className="text-primary hover:underline">
                FAQ
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
