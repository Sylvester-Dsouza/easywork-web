import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out",
    features: [
      { name: "100 requests/month", included: true },
      { name: "All AI providers", included: true },
      { name: "Basic support", included: true },
      { name: "Usage analytics", included: false },
      { name: "Priority support", included: false },
      { name: "Team management", included: false },
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    description: "For power users",
    features: [
      { name: "1,000 requests/month", included: true },
      { name: "All AI providers", included: true },
      { name: "Priority support", included: true },
      { name: "Usage analytics", included: true },
      { name: "API access", included: true },
      { name: "Team management", included: false },
    ],
    cta: "Upgrade to Pro",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    description: "For organizations",
    features: [
      { name: "5,000 requests/month", included: true },
      { name: "All AI providers", included: true },
      { name: "Dedicated support", included: true },
      { name: "Usage analytics", included: true },
      { name: "API access", included: true },
      { name: "Team management", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

const faqs = [
  {
    question: "What counts as a request?",
    answer: "Each message you send to the AI agent counts as one request. Bulk operations that process multiple rows still count as a single request.",
  },
  {
    question: "Can I use my own API keys?",
    answer: "Yes! You can use your own OpenAI, Anthropic, or Google API keys. This way you only pay for what you use directly to the AI provider.",
  },
  {
    question: "What happens if I exceed my limit?",
    answer: "You'll receive a notification when you're close to your limit. Once reached, you can upgrade your plan or wait for the next billing cycle.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? "border-primary relative" : ""}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary mr-2" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mr-2" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-24 bg-muted/50 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    <CardDescription className="text-base">
                      {faq.answer}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
