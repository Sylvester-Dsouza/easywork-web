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

    // Get recent usage logs
    const usageLogs = await prisma.usageLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // Get usage stats for current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyStats = await prisma.usageLog.groupBy({
      by: ['status'],
      where: {
        userId: user.id,
        createdAt: { gte: startOfMonth },
      },
      _count: true,
      _sum: { rowsProcessed: true },
    });

    // Get last month stats for comparison
    const startOfLastMonth = new Date(startOfMonth);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

    const lastMonthStats = await prisma.usageLog.aggregate({
      where: {
        userId: user.id,
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
      },
      _count: true,
    });

    const thisMonthTotal = monthlyStats.reduce((acc, stat) => acc + stat._count, 0);
    const lastMonthTotal = lastMonthStats._count || 0;
    const percentChange = lastMonthTotal > 0 
      ? Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100)
      : 0;

    return NextResponse.json({
      recentLogs: usageLogs,
      monthlyStats: {
        total: thisMonthTotal,
        success: monthlyStats.find(s => s.status === 'success')?._count || 0,
        failed: monthlyStats.find(s => s.status === 'failed')?._count || 0,
        rowsProcessed: monthlyStats.reduce((acc, s) => acc + (s._sum.rowsProcessed || 0), 0),
      },
      percentChange,
    });
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
