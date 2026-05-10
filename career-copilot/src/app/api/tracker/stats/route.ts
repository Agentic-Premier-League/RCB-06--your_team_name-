import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const [applicationsRes, interviewsRes, skillsRes, resumeRes] = await Promise.all([
      supabase.from('saved_opportunities').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).in('status', ['applied', 'interview', 'offer']),
      supabase.from('interview_sessions').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).not('score', 'is', null),
      supabase.from('skills').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('resumes').select('score').eq('user_id', user.id)
        .order('created_at', { ascending: false }).limit(1).single(),
    ])

    return NextResponse.json({
      applications_sent: applicationsRes.count || 0,
      interviews_completed: interviewsRes.count || 0,
      skills_count: skillsRes.count || 0,
      profile_score: resumeRes.data?.score || 0,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
