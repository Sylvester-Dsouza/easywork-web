"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap,
  BarChart3, 
  TrendingUp,
  Calendar,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  plan: string;
  requestsUsed: number;
  requestsLimit: number;
  daysUntilRenewal: number;
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

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, usageRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/usage'),
      ]);

      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }
      if (usageRes.ok) {
        setUsage(await usageRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p>Error loading profile. Please try again.</p>
      </div>
    );
  }

  const usagePercent = (profile.requestsUsed / profile.requestsLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your activity and usage.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <a href="https://workspace.google.com/marketplace" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Addon
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{profile.plan.toLowerCase()}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/billing" className="text-primary hover:underline">
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

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent AI requests from Google Sheets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usage?.recentLogs && usage.recentLogs.length > 0 ? (
                usage.recentLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{log.action}</p>
                      <p className="text-xs text-muted-foreground">{log.rowsProcessed} rows • {log.provider}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={log.status === 'success' ? 'secondary' : 'destructive'}>
                        {log.status === 'success' ? 'Completed' : 'Failed'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(log.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No activity yet. Start using the addon!</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/api-keys">
                <Zap className="mr-2 h-4 w-4" />
                Manage API Keys
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/usage">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Usage
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/billing">
                <Calendar className="mr-2 h-4 w-4" />
                Billing Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
