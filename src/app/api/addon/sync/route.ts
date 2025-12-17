import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/encryption';
import { Prisma } from '@prisma/client';

// This endpoint is called by the Google Sheets addon to sync data
// It uses the user's email to identify them (from Google OAuth in the addon)

type ProfileWithKeys = Prisma.ProfileGetPayload<{
  include: { apiKeys: true }
}>;

export async function POST(request: Request) {
  try {
    const { connectToken, action, provider, model, rowsProcessed, status } = await request.json();

    if (!connectToken) {
      return NextResponse.json({ error: 'Connect Token is required' }, { status: 401 });
    }

    // Find user by connectToken
    const profile = await prisma.profile.findUnique({
      where: { connectToken } as any,
      include: {
        apiKeys: true,
      },
    }) as ProfileWithKeys | null;

    if (!profile) {
      return NextResponse.json({ error: 'Invalid Connect Token' }, { status: 401 });
    }

    // Check usage limits
    if (profile.requestsUsed >= profile.requestsLimit) {
      return NextResponse.json({ 
        error: 'Usage limit exceeded',
        limit: profile.requestsLimit,
        used: profile.requestsUsed,
      }, { status: 429 });
    }

    // Log the usage
    await prisma.usageLog.create({
      data: {
        userId: profile.id,
        action: action || 'AI Request',
        provider: provider || 'unknown',
        model: model || 'unknown',
        rowsProcessed: rowsProcessed || 0,
        status: status === 'success' ? 'success' : 'failed',
      },
    });

    // Increment usage count
    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        requestsUsed: { increment: 1 },
      },
    });

    return NextResponse.json({
      success: true,
      usage: {
        used: profile.requestsUsed + 1,
        limit: profile.requestsLimit,
        remaining: profile.requestsLimit - profile.requestsUsed - 1,
      },
    });
  } catch (error) {
    console.error('Addon sync error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint for addon to fetch user data and API keys
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const connectToken = searchParams.get('token');

    if (!connectToken) {
      return NextResponse.json({ error: 'Connect Token is required' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { connectToken } as any,
      include: {
        apiKeys: true,
      },
    }) as ProfileWithKeys | null;

    if (!profile) {
      return NextResponse.json({ error: 'Invalid Connect Token' }, { status: 401 });
    }

    // Decrypt API keys for the addon
    const apiKeys: Record<string, string> = {};
    for (const key of profile.apiKeys) {
      apiKeys[key.provider] = decrypt(key.encryptedKey);
    }

    return NextResponse.json({
      id: profile.id,
      email: profile.email,
      plan: profile.plan,
      usage: {
        used: profile.requestsUsed,
        limit: profile.requestsLimit,
        remaining: profile.requestsLimit - profile.requestsUsed,
      },
      apiKeys,
    });
  } catch (error) {
    console.error('Addon fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
