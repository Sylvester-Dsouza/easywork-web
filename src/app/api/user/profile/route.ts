import { createClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create profile
    let profile = await prisma.profile.findUnique({
      where: { id: user.id },
      include: {
        apiKeys: {
          select: {
            provider: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      // Create profile for new user
      profile = await prisma.profile.create({
        data: {
          id: user.id,
          email: user.email!,
          fullName: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          requestsUsed: 0,
          requestsLimit: 100,
          billingCycleStart: new Date(),
        },
        include: {
          apiKeys: {
            select: {
              provider: true,
              createdAt: true,
            },
          },
        },
      });
    }

    // Calculate days until billing cycle reset
    const billingStart = profile.billingCycleStart ? new Date(profile.billingCycleStart) : new Date();
    const nextBilling = new Date(billingStart);
    nextBilling.setDate(nextBilling.getDate() + 30);
    const daysUntilRenewal = Math.max(0, Math.ceil((nextBilling.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

    return NextResponse.json({
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      avatarUrl: profile.avatarUrl,
      plan: profile.plan,
      requestsUsed: profile.requestsUsed,
      requestsLimit: profile.requestsLimit,
      daysUntilRenewal,
      apiKeys: profile.apiKeys,
      createdAt: profile.createdAt,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
