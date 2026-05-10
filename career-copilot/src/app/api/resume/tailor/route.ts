import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { tailorResume } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { resume_text, job_description, company, role } = await req.json()
    if (!resume_text || !job_description) {
      return NextResponse.json({ error: 'Resume text and job description are required' }, { status: 400 })
    }

    const result = await tailorResume(resume_text, job_description, company || '', role || '')
    return NextResponse.json(result)
  } catch (err) {
    console.error('Resume tailor error:', err)
    return NextResponse.json({ error: 'Failed to tailor resume' }, { status: 500 })
  }
}
