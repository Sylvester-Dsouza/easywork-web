import { createClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

function generateToken(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.id }, // Use ID for safety, though email is unique too
      select: { connectToken: true },
    });

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let token = profile.connectToken;

    // If no token exists, generate one automatically
    if (!token) {
      token = generateToken();
      await prisma.profile.update({
        where: { id: user.id },
        data: { connectToken: token },
      });
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Connect token fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Regenerate token
    const token = generateToken();
    
    await prisma.profile.update({
      where: { id: user.id },
      data: { connectToken: token },
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Connect token generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
