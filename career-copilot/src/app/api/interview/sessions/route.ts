import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('interview_sessions')
      .select('*, interview_questions(count)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { type, role, company, duration_minutes } = await req.json()
    if (!type || !role) return NextResponse.json({ error: 'Type and role are required' }, { status: 400 })

    const { data, error } = await supabase
      .from('interview_sessions')
      .insert({ user_id: user.id, type, role, company, duration_minutes: duration_minutes || 30 })
      .select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    await supabase.from('activity_log').insert({
      user_id: user.id,
      action: 'started_interview',
      metadata: { type, role, company },
    })

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
