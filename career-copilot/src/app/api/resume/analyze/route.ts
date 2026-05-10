import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeResume } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { resume_text, file_url, file_name } = await req.json()
    if (!resume_text) return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })

    const analysis = await analyzeResume(resume_text)

    const { data, error } = await supabase.from('resumes').insert({
      user_id: user.id,
      file_url: file_url || '',
      file_name: file_name || 'resume',
      score: analysis.score,
      keywords_found: analysis.keywords_found,
      keywords_missing: analysis.keywords_missing,
      analysis: analysis.analysis,
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    await supabase.from('activity_log').insert({
      user_id: user.id,
      action: 'resume_analyzed',
      metadata: { score: analysis.score, file_name },
    })

    return NextResponse.json({ ...data, suggestions: analysis.suggestions })
  } catch (err) {
    console.error('Resume analyze error:', err)
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}
