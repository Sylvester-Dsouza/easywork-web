import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: 'free' | 'pro' | 'team' | 'enterprise';
          requests_used: number;
          requests_limit: number;
          billing_cycle_start: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: 'free' | 'pro' | 'team' | 'enterprise';
          requests_used?: number;
          requests_limit?: number;
          billing_cycle_start?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: 'free' | 'pro' | 'team' | 'enterprise';
          requests_used?: number;
          requests_limit?: number;
          billing_cycle_start?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          provider: 'openai' | 'anthropic' | 'gemini';
          encrypted_key: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: 'openai' | 'anthropic' | 'gemini';
          encrypted_key: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: 'openai' | 'anthropic' | 'gemini';
          encrypted_key?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      usage_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          rows_processed: number;
          provider: string;
          model: string;
          status: 'success' | 'failed';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          rows_processed?: number;
          provider: string;
          model: string;
          status: 'success' | 'failed';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          rows_processed?: number;
          provider?: string;
          model?: string;
          status?: 'success' | 'failed';
          created_at?: string;
        };
      };
    };
  };
};
