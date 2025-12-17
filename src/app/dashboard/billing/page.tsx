"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
        <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>You are currently on the Pro Plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$9/month • Renews on Jan 15, 2025</p>
              </div>
              <Button variant="outline">Change Plan</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Dec 2024", "Nov 2024", "Oct 2024"].map((month) => (
                <div key={month} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{month}</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - $9.00</p>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Available Plans</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>For personal use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 100 requests/mo</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Standard support</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> All providers</li>
              </ul>
              <Button className="w-full mt-6" variant="outline">Downgrade</Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For power users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$9<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Unlimited requests</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority support</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Advanced features</li>
              </ul>
              <Button className="w-full mt-6">Current Plan</Button>
            </CardContent>
          </Card>

          {/* Team Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>For teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Shared billing</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Admin controls</li>
                <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Dedicated support</li>
              </ul>
              <Button className="w-full mt-6" variant="outline">Upgrade</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
