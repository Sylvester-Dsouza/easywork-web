"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Copy, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UserProfile {
  email: string;
  fullName: string | null;
  plan: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [connectToken, setConnectToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, tokenRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/connect-token')
      ]);

      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }
      
      if (tokenRes.ok) {
        const data = await tokenRes.json();
        setConnectToken(data.token);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(connectToken);
    toast.success("Token copied to clipboard");
  };

  const regenerateToken = async () => {
    if (!confirm("Are you sure you want to regenerate your Connect Token? The old one will stop working immediately.")) {
      return;
    }

    setRegenerating(true);
    try {
      const res = await fetch('/api/user/connect-token', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setConnectToken(data.token);
        toast.success("Connect Token regenerated successfully");
      } else {
        toast.error("Failed to regenerate token");
      }
    } catch (error) {
      console.error('Error regenerating token:', error);
      toast.error("An error occurred");
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Your account details and subscription plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={profile?.email || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profile?.fullName || ''} 
                disabled 
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan">Current Plan</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="plan" 
                  value={profile?.plan || 'FREE'} 
                  disabled 
                  className="bg-muted capitalize w-32"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect Token Section */}
        <Card>
          <CardHeader>
            <CardTitle>Connect Token</CardTitle>
            <CardDescription>
              Use this token to connect your Google Sheets addon to your account.
              Keep this token private.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="token" className="sr-only">
                  Connect Token
                </Label>
                <Input
                  id="token"
                  value={connectToken}
                  readOnly
                  className="font-mono text-sm"
                  type="password" 
                />
              </div>
              <Button size="sm" className="px-3" onClick={copyToken}>
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    Click the copy button to use this token in the addon.
                </p>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={regenerateToken}
                    disabled={regenerating}
                >
                    {regenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Regenerate
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
