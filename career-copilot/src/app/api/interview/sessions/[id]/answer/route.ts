import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { evaluateAnswer } from '@/lib/gemini'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { question_id, answer } = await req.json()
    if (!question_id || !answer) return NextResponse.json({ error: 'question_id and answer are required' }, { status: 400 })

    const { data: session } = await supabase
      .from('interview_sessions')
      .select('role')
      .eq('id', id)
      .single()

    const { data: question } = await supabase
      .from('interview_questions')
      .select('question')
      .eq('id', question_id)
      .single()

    const evaluation = await evaluateAnswer(question?.question || '', answer, session?.role || '')

    const { data, error } = await supabase
      .from('interview_questions')
      .update({
        user_answer: answer,
        ai_feedback: evaluation.feedback,
        score: evaluation.score,
      })
      .eq('id', question_id)
      .select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    const { data: allQs } = await supabase
      .from('interview_questions')
      .select('score')
      .eq('session_id', id)
      .not('score', 'is', null)

    if (allQs && allQs.length > 0) {
      const avg = Math.round(allQs.reduce((s, q) => s + (q.score || 0), 0) / allQs.length)
      await supabase.from('interview_sessions').update({ score: avg }).eq('id', id)
    }

    return NextResponse.json({ ...data, strengths: evaluation.strengths, improvements: evaluation.improvements })
  } catch (err) {
    console.error('Answer evaluation error:', err)
    return NextResponse.json({ error: 'Failed to evaluate answer' }, { status: 500 })
  }
}
