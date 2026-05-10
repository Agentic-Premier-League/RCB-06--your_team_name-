import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateInterviewQuestion } from '@/lib/gemini'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: session, error: sessionError } = await supabase
      .from('interview_sessions')
      .select('*, interview_questions(*)')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (sessionError || !session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })

    const previousQuestions = session.interview_questions?.map((q: { question: string }) => q.question) || []
    const question = await generateInterviewQuestion(
      session.type,
      session.role,
      session.company || '',
      previousQuestions
    )

    const orderIndex = previousQuestions.length + 1
    const { data: questionData, error: qError } = await supabase
      .from('interview_questions')
      .insert({ session_id: id, question, order_index: orderIndex })
      .select().single()

    if (qError) return NextResponse.json({ error: qError.message }, { status: 400 })

    return NextResponse.json(questionData, { status: 201 })
  } catch (err) {
    console.error('Question generation error:', err)
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 })
  }
}
