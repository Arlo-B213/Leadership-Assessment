import { QUESTIONS } from '../data/questions'
import { STYLES, STYLE_ORDER } from '../data/styles'

// answers: { [questionId]: string[] } - array of selected option ids per question
export function computeScores(answers) {
  const raw = { directive: 0, collaborative: 0, handsOff: 0, transformational: 0, eqLeader: 0 }
  let empathyRaw = 0
  let maxEmpathy = 0
  const maxPerStyle = { directive: 0, collaborative: 0, handsOff: 0, transformational: 0, eqLeader: 0 }

  QUESTIONS.forEach((q) => {
    const selected = answers[q.id] || []
    let bestPerStyle = { directive: 0, collaborative: 0, handsOff: 0, transformational: 0, eqLeader: 0 }
    let bestEmpathy = 0

    q.options.forEach((opt) => {
      Object.entries(opt.weights || {}).forEach(([style, val]) => {
        if (val > bestPerStyle[style]) bestPerStyle[style] = val
      })
      if ((opt.empathy || 0) > bestEmpathy) bestEmpathy = opt.empathy || 0
    })
    Object.keys(maxPerStyle).forEach((style) => {
      maxPerStyle[style] += bestPerStyle[style]
    })
    maxEmpathy += bestEmpathy

    selected.forEach((optId) => {
      const opt = q.options.find((o) => o.id === optId)
      if (!opt) return
      Object.entries(opt.weights || {}).forEach(([style, val]) => {
        raw[style] += val
      })
      empathyRaw += opt.empathy || 0
    })
  })

  const percentages = {}
  STYLE_ORDER.forEach((style) => {
    percentages[style] = maxPerStyle[style] > 0 ? Math.round((raw[style] / maxPerStyle[style]) * 100) : 0
  })
  const empathyScore = maxEmpathy > 0 ? Math.round((empathyRaw / maxEmpathy) * 100) : 0

  const dominantStyle = STYLE_ORDER.reduce((best, style) =>
    percentages[style] > percentages[best] ? style : best,
  STYLE_ORDER[0])

  const secondaryStyle = STYLE_ORDER
    .filter((s) => s !== dominantStyle)
    .reduce((best, style) => (percentages[style] > percentages[best] ? style : best), STYLE_ORDER.filter((s) => s !== dominantStyle)[0])

  const weakestStyle = STYLE_ORDER.reduce((worst, style) =>
    percentages[style] < percentages[worst] ? style : worst,
  STYLE_ORDER[0])

  return {
    raw,
    percentages,
    empathyScore,
    dominantStyle,
    secondaryStyle,
    weakestStyle,
    answeredCount: Object.keys(answers).filter((k) => (answers[k] || []).length > 0).length,
    totalQuestions: QUESTIONS.length,
  }
}

export function buildRoadmap(scores) {
  const dominant = STYLES[scores.dominantStyle]
  const weakest = STYLES[scores.weakestStyle]

  const focusAreas = [
    {
      title: `Lean into your strength: ${dominant.name}`,
      items: dominant.strengths.slice(0, 2),
    },
    {
      title: `Growth edge: build more ${weakest.name} habits`,
      items: weakest.roadmap.slice(0, 3),
    },
    {
      title: 'Empathy practice',
      items: scores.empathyScore < 60
        ? [
            'Start 1:1s by asking how the person is doing before diving into work topics',
            'Practice naming emotions you observe on the team before problem-solving',
            'Ask "what support do you need?" instead of assuming',
          ]
        : [
            'Keep pairing your empathy with clear, direct expectations',
            'Make sure empathy doesn\'t delay necessary tough conversations',
            'Share how you balance care and accountability with other managers',
          ],
    },
  ]

  return {
    dominant,
    weakest,
    focusAreas,
  }
}
