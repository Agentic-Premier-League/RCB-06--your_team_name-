export interface Profile {
  id: string
  first_name: string
  last_name: string
  university: string
  major: string
  grad_year: number
  gpa?: string
  linkedin_url?: string
  portfolio_url?: string
  skills: string[]
  created_at: string
}

export interface Resume {
  id: string
  user_id: string
  file_url: string
  file_name: string
  score: number
  keywords_found: string[]
  keywords_missing: string[]
  analysis: {
    keywords: number
    skills: number
    experience: number
    formatting: number
  }
  created_at: string
}

export interface Opportunity {
  id: string
  title: string
  company: string
  location: string
  work_type: 'remote' | 'hybrid' | 'onsite'
  stipend: string
  deadline: string
  tags: string[]
  description: string
  requirements: string[]
  match_score?: number
  is_saved?: boolean
  application_status?: 'saved' | 'applied' | 'interview' | 'offer'
}

export interface InterviewSession {
  id: string
  user_id: string
  type: 'behavioral' | 'technical' | 'system_design' | 'hr'
  role: string
  company?: string
  duration_minutes: number
  score?: number
  created_at: string
  questions?: InterviewQuestion[]
}

export interface InterviewQuestion {
  id: string
  session_id: string
  question: string
  user_answer?: string
  ai_feedback?: string
  score?: number
  order_index: number
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description?: string
  category: 'applications' | 'interviews' | 'skills' | 'networking' | 'resume' | 'custom'
  target_date?: string
  priority: 'high' | 'medium' | 'low'
  current_value: number
  target_value: number
  status: 'active' | 'completed'
  milestones: { label: string; done: boolean }[]
  created_at: string
}

export interface Skill {
  id: string
  user_id: string
  name: string
  level: number
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface TrackerStats {
  applications_sent: number
  interviews_completed: number
  skills_count: number
  profile_score: number
}
