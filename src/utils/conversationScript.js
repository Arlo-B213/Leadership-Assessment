const STYLE_TIPS = {
  directive: 'You tend to default to instructions — leave real space for them to respond before moving to next steps.',
  collaborative: 'You tend to seek consensus — it\'s okay for this conversation to end with a clear, non-negotiable ask rather than open discussion.',
  handsOff: 'You may be tempted to soften this into a suggestion — be explicit that this is a required change, not optional.',
  transformational: 'Don\'t let big-picture framing dilute the specific, concrete behavior you need to see change.',
  eqLeader: 'Your instinct to lead with empathy is a strength here — just don\'t let it delay stating the actual ask clearly.',
}

// Builds a talking-points script using the Situation-Behavior-Impact (SBI)
// framework, plus a specific ask and an accountability close.
export function buildConversationScript({ situation, behavior, impact, desiredChange, dominantStyle }) {
  const sections = [
    {
      label: 'Open',
      text: `Thanks for making time. I want to talk through something specific so we're aligned going forward.`,
    },
    {
      label: 'Situation',
      text: situation,
    },
    {
      label: 'Behavior',
      text: `Specifically, ${behavior}`,
    },
    {
      label: 'Impact',
      text: `Here's the impact: ${impact}`,
    },
    {
      label: 'The ask',
      text: `Going forward, I need ${desiredChange}`,
    },
    {
      label: 'Accountability close',
      text: `Can you walk me through how that'll look in practice? Let's check back in on this in a couple weeks.`,
    },
  ]

  const tip = dominantStyle ? STYLE_TIPS[dominantStyle] : null

  return { sections, tip }
}
