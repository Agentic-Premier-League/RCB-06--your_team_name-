import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Admin client bypasses email confirmation
function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, first_name, last_name, university, grad_year } = await req.json()

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Create user with email already confirmed — no confirmation email sent
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,   // ← key: marks email as confirmed immediately
    })

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    // Insert profile row
    if (created.user) {
      await admin.from('profiles').insert({
        id: created.user.id,
        first_name,
        last_name,
        university: university || '',
        grad_year: grad_year || null,
        skills: [],
      })
    }

    // Now sign in with the regular (cookie-aware) client to get a session
    const supabase = await createClient()
    const { data: signIn, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      // Account created but session couldn't be established — user can log in manually
      return NextResponse.json({
        message: 'Account created successfully',
        requiresConfirmation: false,
      })
    }

    return NextResponse.json({
      message: 'Account created successfully',
      user: signIn.user,
      session: true,
      requiresConfirmation: false,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
