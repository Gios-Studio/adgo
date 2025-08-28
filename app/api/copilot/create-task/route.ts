import { NextResponse } from 'next/server';
import { createTaskForSelf } from '@/server/copilot';

export async function POST() {
  try {
    const task = await createTaskForSelf({
      title: 'Lock Nairobi ride-hailing partner',
      description: 'Outreach to Little & inDrive; NDA + rev-share draft; schedule demo',
      priority: 1,
      dueDate: new Date(Date.now() + 7*24*3600*1000).toISOString(),
      city: 'Nairobi',
      tags: ['partnership','launch'],
      kpiTargets: { rides_ad_enabled: '>=30%', ctr: '1.5-3.5%', ecpm_premium: '+20%' },
      roiTag: { est_rev_usd: 3000, confidence: 0.7 },
    });
    return NextResponse.json({ ok: true, task });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
