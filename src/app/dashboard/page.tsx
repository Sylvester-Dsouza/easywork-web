"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Sparkles, 
  BarChart3, 
  Settings, 
  CreditCard, 
  LogOut, 
  User,
  Zap,
  TrendingUp,
  Calendar,
  ExternalLink,
  Loader2,
  Check,
  X
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  plan: string;
  requestsUsed: number;
  requestsLimit: number;
  daysUntilRenewal: number;
  apiKeys: { provider: string; createdAt: string }[];
}

interface UsageData {
  recentLogs: {
    id: string;
    action: string;
    rowsProcessed: number;
    provider: string;
    model: string;
    status: string;
    createdAt: string;
  }[];
  monthlyStats: {
    total: number;
    success: number;
    failed: number;
    rowsProcessed: number;
  };
  percentChange: number;
}

interface ApiKeyData {
  apiKeys: {
    id: string;
    provider: string;
    maskedKey: string;
    createdAt: string;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKeyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState({ provider: '', key: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, usageRes, keysRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/usage'),
        fetch('/api/user/api-keys'),
      ]);

      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }
      if (usageRes.ok) {
        setUsage(await usageRes.json());
      }
      if (keysRes.ok) {
        setApiKeys(await keysRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleSaveApiKey = async () => {
    if (!newApiKey.provider || !newApiKey.key) return;
    
    setSavingKey(true);
    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: newApiKey.provider, apiKey: newApiKey.key }),
      });

      if (res.ok) {
        await fetchData();
        setNewApiKey({ provider: '', key: '' });
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setSavingKey(false);
    }
  };

  const handleDeleteApiKey = async (provider: string) => {
    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider }),
      });

      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading profile. Please try again.</p>
      </div>
    );
  }

  const usagePercent = (profile.requestsUsed / profile.requestsLimit) * 100;
  const getProviderKey = (provider: string) => 
    apiKeys?.apiKeys.find(k => k.provider === provider);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Easyworks</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://workspace.google.com/marketplace" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Addon
              </a>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.avatarUrl || ''} alt={profile.fullName || ''} />
                    <AvatarFallback>{profile.fullName?.charAt(0) || profile.email.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile.fullName || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your account and view usage</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{profile.plan.toLowerCase()}</div>
              <p className="text-xs text-muted-foreground">
                <Link href="/pricing" className="text-primary hover:underline">
                  Upgrade plan
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requests Used</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile.requestsUsed} / {profile.requestsLimit}</div>
              <Progress value={usagePercent} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage?.percentChange !== undefined ? (usage.percentChange >= 0 ? '+' : '') + usage.percentChange + '%' : '0%'}</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billing Cycle</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile.daysUntilRenewal} days</div>
              <p className="text-xs text-muted-foreground">until renewal</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="usage" className="space-y-4">
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>Your API usage over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Usage chart will be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent AI requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usage?.recentLogs && usage.recentLogs.length > 0 ? (
                    usage.recentLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">{log.rowsProcessed} rows processed • {log.provider}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={log.status === 'success' ? 'secondary' : 'destructive'}>
                            {log.status === 'success' ? 'Completed' : 'Failed'}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(log.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No activity yet. Start using the addon!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>Manage your subscription and payment method</CardDescription>
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
                <CardDescription>Download your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Dec 2024", "Nov 2024", "Oct 2024"].map((month) => (
                    <div key={month} className="flex items-center justify-between py-2">
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your AI provider API keys. These sync with the addon.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(['openai', 'anthropic', 'gemini'] as const).map((provider) => {
                  const key = getProviderKey(provider);
                  const providerNames: Record<string, string> = {
                    openai: 'OpenAI',
                    anthropic: 'Anthropic Claude',
                    gemini: 'Google Gemini',
                  };
                  return (
                    <div key={provider} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{providerNames[provider]} API Key</p>
                        <p className="text-sm text-muted-foreground">
                          {key ? key.maskedKey : 'Not configured'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {key && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteApiKey(provider)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        <Dialog open={dialogOpen && newApiKey.provider === provider} onOpenChange={(open) => {
                          setDialogOpen(open);
                          if (open) setNewApiKey({ provider, key: '' });
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {key ? 'Update' : 'Add'}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{key ? 'Update' : 'Add'} {providerNames[provider]} API Key</DialogTitle>
                              <DialogDescription>
                                Enter your API key. It will be encrypted and synced with the addon.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="apiKey">API Key</Label>
                                <Input
                                  id="apiKey"
                                  type="password"
                                  placeholder="Enter your API key"
                                  value={newApiKey.key}
                                  onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleSaveApiKey} disabled={savingKey || !newApiKey.key}>
                                {savingKey ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Save
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">••••••••</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
