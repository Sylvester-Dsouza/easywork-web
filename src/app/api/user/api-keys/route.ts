import { createClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Simple encryption for API keys (in production, use proper encryption)
function encryptKey(key: string): string {
  return Buffer.from(key).toString('base64');
}

function decryptKey(encrypted: string): string {
  return Buffer.from(encrypted, 'base64').toString('utf-8');
}

function maskKey(key: string): string {
  if (key.length <= 8) return '••••••••';
  return key.substring(0, 4) + '••••' + key.substring(key.length - 4);
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: user.id },
    });

    // Return masked keys
    const maskedKeys = apiKeys.map(key => ({
      id: key.id,
      provider: key.provider,
      maskedKey: maskKey(decryptKey(key.encryptedKey)),
      createdAt: key.createdAt,
      updatedAt: key.updatedAt,
    }));

    return NextResponse.json({ apiKeys: maskedKeys });
  } catch (error) {
    console.error('API keys fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { provider, apiKey } = await request.json();

    if (!provider || !apiKey) {
      return NextResponse.json({ error: 'Provider and API key are required' }, { status: 400 });
    }

    if (!['openai', 'anthropic', 'gemini'].includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    // Upsert the API key
    const savedKey = await prisma.apiKey.upsert({
      where: {
        userId_provider: {
          userId: user.id,
          provider: provider,
        },
      },
      update: {
        encryptedKey: encryptKey(apiKey),
      },
      create: {
        userId: user.id,
        provider: provider,
        encryptedKey: encryptKey(apiKey),
      },
    });

    return NextResponse.json({
      id: savedKey.id,
      provider: savedKey.provider,
      maskedKey: maskKey(apiKey),
      message: 'API key saved successfully',
    });
  } catch (error) {
    console.error('API key save error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { provider } = await request.json();

    if (!provider) {
      return NextResponse.json({ error: 'Provider is required' }, { status: 400 });
    }

    await prisma.apiKey.delete({
      where: {
        userId_provider: {
          userId: user.id,
          provider: provider,
        },
      },
    });

    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('API key delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
