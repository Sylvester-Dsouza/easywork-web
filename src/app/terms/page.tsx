import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: December 2024
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using Easyworks SheetGPT (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Easyworks SheetGPT is a Google Sheets addon that uses artificial intelligence to help automate spreadsheet tasks. The Service allows users to interact with AI models through a chat interface to perform various operations on their spreadsheet data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              To use certain features of the Service, you must create an account using Google OAuth. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. API Keys</h2>
            <p className="text-muted-foreground mb-4">
              You may use your own API keys from supported AI providers (OpenAI, Anthropic, Google). You are responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Keeping your API keys secure</li>
              <li>Any charges incurred through your API keys</li>
              <li>Complying with the terms of service of the AI providers</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Generate harmful, abusive, or illegal content</li>
              <li>Attempt to circumvent usage limits or security measures</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Subscription and Billing</h2>
            <p className="text-muted-foreground mb-4">
              Paid subscriptions are billed monthly or annually. You may cancel your subscription at any time, and you will continue to have access until the end of your billing period. Refunds are provided at our discretion.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The Service and its original content, features, and functionality are owned by Easyworks and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. AI-GENERATED CONTENT MAY CONTAIN ERRORS AND SHOULD BE REVIEWED BEFORE USE.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              IN NO EVENT SHALL EASYWORKS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the Service. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your account at any time for violations of these terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: legal@easyworks.ai<br />
              Address: 123 AI Street, San Francisco, CA 94102
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
