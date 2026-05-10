import Link from 'next/link'

const QA = [
  {
    question: 'Tell me about a time you faced a significant technical challenge.',
    answer: 'During my internship project, I was tasked with optimizing a database query that was taking over 30 seconds. I started by analyzing the execution plan, identified missing indexes, and refactored the ORM calls to use raw SQL for the critical path. The result was a 95% reduction in query time.',
    feedback: 'Good use of structure in your answer. You clearly identified the problem and your actions. To improve, quantify the business impact — how many users were affected?',
    score: 82,
    scoreClass: 'sc-green',
  },
  {
    question: 'Describe a situation where you had to work with a difficult teammate.',
    answer: 'I had a teammate who missed several deadlines on a group project. I scheduled a one-on-one to understand their blockers, redistributed tasks based on strengths, and we ended up delivering on time.',
    feedback: 'Strong answer showing leadership and empathy. Next time, mention the specific outcome for the team — did the project receive positive feedback?',
    score: 74,
    scoreClass: 'sc-yellow',
  },
]

export default function InterviewReviewPage() {
  const totalScore = Math.round(QA.reduce((s, q) => s + q.score, 0) / QA.length)

  return (
    <>
      {/* Score Banner */}
      <div className="review-score-banner">
        <div className="review-score-circle">
          <span className="review-score-num">{totalScore}</span>
          <span className="review-score-denom">/ 100</span>
        </div>
        <div className="review-meta">
          <h2>Behavioral Interview — Good Job!</h2>
          <p>Software Engineering Intern · 20 min session · {QA.length} questions answered</p>
          <div className="review-stats">
            <div className="review-stat">
              <div className="review-stat-val">{QA.length}</div>
              <div className="review-stat-label">Questions</div>
            </div>
            <div className="review-stat">
              <div className="review-stat-val">{Math.max(...QA.map(q => q.score))}</div>
              <div className="review-stat-label">Best Score</div>
            </div>
            <div className="review-stat">
              <div className="review-stat-val">20</div>
              <div className="review-stat-label">Minutes</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '1.5rem', alignItems: 'start' }}>
        {/* Q&A breakdown */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Question-by-Question Breakdown</h3>
          {QA.map((q, i) => (
            <div key={i} className="qa-item">
              <div className="qa-question">
                <div className="qa-question-label">Question {i + 1}</div>
                <p className="qa-question-text">{q.question}</p>
              </div>
              <div className="qa-answer">
                <div className="qa-answer-label">Your Answer</div>
                <p className="qa-answer-text">{q.answer}</p>
              </div>
              <div className="qa-feedback-row">
                <div className="qa-feedback-score">
                  <div className={`session-score ${q.scoreClass}`} style={{ fontSize: '1.25rem' }}>{q.score}</div>
                  <div className="qa-feedback-label">Score</div>
                </div>
                <div className="qa-feedback-text">
                  <h4>AI Feedback</h4>
                  <p>{q.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header"><h3>Key Insights</h3></div>
            <div className="card-body">
              {[
                ['ph-check-circle text-success', 'Strong problem-solving narrative in Q1'],
                ['ph-check-circle text-success', 'Good use of specific examples throughout'],
                ['ph-warning text-warning', 'Add more quantified results (%, time saved)'],
                ['ph-warning text-warning', 'Practice being more concise — aim for 90 sec'],
              ].map(([icon, text]) => (
                <div key={text} className="insight-item">
                  <i className={`ph ${icon}`}></i>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4 style={{ marginBottom: '1rem' }}>Next Steps</h4>
              <Link href="/interview" className="btn btn-primary btn-full" style={{ marginBottom: '0.75rem' }}>
                <i className="ph ph-arrow-counter-clockwise"></i> Practice Again
              </Link>
              <Link href="/opportunities" className="btn btn-outline btn-full">
                <i className="ph ph-briefcase"></i> View Matched Internships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
