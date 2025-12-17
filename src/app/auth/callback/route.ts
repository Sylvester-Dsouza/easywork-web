import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getURL } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options as Record<string, unknown>)
              );
            } catch {
              // Handle error
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user profile exists, if not create one using Prisma
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        try {
          // Check if profile exists in Prisma database
          const existingProfile = await prisma.profile.findUnique({
            where: { id: user.id },
          });

          if (!existingProfile) {
            // Create new profile for first-time users using Prisma
            await prisma.profile.create({
              data: {
                id: user.id,
                email: user.email!,
                fullName: user.user_metadata?.full_name || user.user_metadata?.name || null,
                avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
                requestsUsed: 0,
                requestsLimit: 100,
                billingCycleStart: new Date(),
              },
            });
            console.log('Created new profile for user:', user.id);
          }
        } catch (dbError) {
          console.error('Error creating profile:', dbError);
          // Continue anyway - profile will be created on first dashboard visit
        }
      }

      const baseUrl = getURL();
      // Ensure we don't have double slashes if next starts with /
      const redirectPath = next.startsWith('/') ? next.slice(1) : next;
      return NextResponse.redirect(`${baseUrl}${redirectPath}`);
    }
  }

  // Return the user to an error page with instructions
  const baseUrl = getURL();
  return NextResponse.redirect(`${baseUrl}login?error=auth_failed`);
}
