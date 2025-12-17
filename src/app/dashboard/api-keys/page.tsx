"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, X } from "lucide-react";

interface ApiKeyData {
  apiKeys: {
    id: string;
    provider: string;
    maskedKey: string;
    createdAt: string;
  }[];
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState({ provider: '', key: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch('/api/user/api-keys');
      if (res.ok) {
        setApiKeys(await res.json());
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    } finally {
      setLoading(false);
    }
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
        await fetchKeys();
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
        await fetchKeys();
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  const getProviderKey = (provider: string) => 
    apiKeys?.apiKeys.find(k => k.provider === provider);

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">API Keys</h2>
        <p className="text-muted-foreground">
          Manage your AI provider API keys. These sync with the Google Sheets addon.
        </p>
      </div>

      <div className="grid gap-4">
        {(['openai', 'anthropic', 'gemini'] as const).map((provider) => {
          const key = getProviderKey(provider);
          const providerNames: Record<string, string> = {
            openai: 'OpenAI',
            anthropic: 'Anthropic Claude',
            gemini: 'Google Gemini',
          };
          
          return (
            <Card key={provider}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-medium">{providerNames[provider]}</CardTitle>
                  <CardDescription>
                    {key ? `Configured on ${new Date(key.createdAt).toLocaleDateString()}` : 'Not configured'}
                  </CardDescription>
                </div>
                {key && (
                   <Button variant="ghost" size="sm" onClick={() => handleDeleteApiKey(provider)}>
                     <X className="h-4 w-4 mr-2" /> Unlink
                   </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {key ? key.maskedKey : 'Not configured'}
                  </div>
                  <Dialog open={dialogOpen && newApiKey.provider === provider} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (open) setNewApiKey({ provider, key: '' });
                  }}>
                    <DialogTrigger asChild>
                      <Button variant={key ? "outline" : "default"} size="sm">
                        {key ? 'Update Key' : 'Add Key'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{key ? 'Update' : 'Add'} {providerNames[provider]} API Key</DialogTitle>
                        <DialogDescription>
                          Enter your API key. It will be encrypted and safely stored.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input
                            id="apiKey"
                            type="password"
                            placeholder={`sk-...`}
                            value={newApiKey.key}
                            onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSaveApiKey} disabled={savingKey || !newApiKey.key}>
                          {savingKey ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Save Key
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
