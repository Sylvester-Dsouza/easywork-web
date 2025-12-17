"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

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
}

export default function UsagePage() {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/usage')
      .then(res => res.json())
      .then(data => setUsage(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usage History</h2>
        <p className="text-muted-foreground">Detailed logs of your AI requests.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{usage?.monthlyStats.total || 0}</div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Rows Processed</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{usage?.monthlyStats.rowsProcessed || 0}</div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">
               {usage?.monthlyStats.total ? Math.round((usage.monthlyStats.success / usage.monthlyStats.total) * 100) : 0}%
             </div>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Logs</CardTitle>
          <CardDescription>Recent activity history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usage?.recentLogs && usage.recentLogs.length > 0 ? (
              usage.recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.rowsProcessed} rows • {log.provider} • {log.model}</p>
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
              <p className="text-muted-foreground text-center py-8">No usage history found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
