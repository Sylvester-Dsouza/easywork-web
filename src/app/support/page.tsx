"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MessageSquare, Mail, BookOpen, Clock } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Support</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get help from our team or browse our documentation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Browse our guides and tutorials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/docs">
                  <Button variant="outline" className="w-full">View Docs</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MessageSquare className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Chat with our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Mail className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  We respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:support@easyworks.ai">Send Email</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your issue or question..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="py-16 bg-muted/50 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Response Times</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is available Monday to Friday, 9am - 6pm EST
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">&lt; 1hr</p>
                <p className="text-sm text-muted-foreground">Live Chat</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">&lt; 24hr</p>
                <p className="text-sm text-muted-foreground">Email</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
