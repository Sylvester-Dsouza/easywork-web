import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: December 2024
            </p>
          </div>

          <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Easyworks (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our SheetGPT addon and website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">Account Information</h3>
            <p className="text-muted-foreground mb-4">
              When you create an account, we collect your email address and name through Google OAuth. We do not store your Google password.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Usage Data</h3>
            <p className="text-muted-foreground mb-4">
              We collect information about how you use our service, including the number of API requests made, features used, and error logs for debugging purposes.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Spreadsheet Data</h3>
            <p className="text-muted-foreground mb-4">
              <strong>We do not store your spreadsheet data.</strong> Your data is processed in real-time and sent directly to the AI provider you choose (OpenAI, Anthropic, or Google). We never retain copies of your spreadsheet content.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>To provide and maintain our service</li>
              <li>To process your subscription and payments</li>
              <li>To send you important updates about our service</li>
              <li>To respond to your support requests</li>
              <li>To improve our service based on usage patterns</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. API Keys</h2>
            <p className="text-muted-foreground mb-4">
              Your API keys are encrypted using industry-standard encryption (AES-256) and stored securely. We never share your API keys with third parties. You can delete your API keys at any time from your dashboard.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Stripe</strong> - For payment processing</li>
              <li><strong>Google OAuth</strong> - For authentication</li>
              <li><strong>AI Providers</strong> - OpenAI, Anthropic, Google (based on your choice)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your account information for as long as your account is active. Usage logs are retained for 90 days. You can request deletion of your data at any time by contacting support.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your data, including encryption in transit (TLS) and at rest (AES-256), regular security audits, and access controls.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: privacy@easyworks.ai<br />
              Address: 123 AI Street, San Francisco, CA 94102
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
