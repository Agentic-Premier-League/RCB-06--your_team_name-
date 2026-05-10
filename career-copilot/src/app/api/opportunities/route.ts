import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')
    const work_type = searchParams.get('work_type')
    const location = searchParams.get('location')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let query = supabase.from('opportunities').select('*', { count: 'exact' })

    if (role) query = query.ilike('title', `%${role}%`)
    if (work_type) query = query.eq('work_type', work_type)
    if (location && location !== 'anywhere') query = query.ilike('location', `%${location}%`)
    if (search) query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%`)

    const from = (page - 1) * limit
    query = query.range(from, from + limit - 1).order('created_at', { ascending: false })

    const { data: opportunities, error, count } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    let saved: string[] = []
    if (user) {
      const { data: savedData } = await supabase
        .from('saved_opportunities')
        .select('opportunity_id')
        .eq('user_id', user.id)
      saved = savedData?.map(s => s.opportunity_id) || []
    }

    const enriched = opportunities?.map(o => ({
      ...o,
      is_saved: saved.includes(o.id),
    })) || []

    return NextResponse.json({ opportunities: enriched, total: count, page, limit })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
