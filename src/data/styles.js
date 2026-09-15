// The 5 management styles this assessment measures.
// Keys must match the weight keys used in data/questions.js
export const STYLES = {
  directive: {
    key: 'directive',
    name: 'Directive Leader',
    tagline: 'Clear direction, fast decisions',
    color: '#dc2626',
    description:
      'You lead with clarity and decisiveness. You set expectations, make the call, and keep the team moving without much ambiguity.',
    strengths: [
      'Fast, confident decision-making under pressure',
      'Clear expectations reduce confusion',
      'Effective in crises or tight deadlines',
      'Strong sense of accountability and ownership',
    ],
    weaknesses: [
      'Can suppress team input and creativity',
      'Risk of burning out as the single point of decisions',
      'May come across as controlling to senior team members',
      'Slower to adapt when the plan needs to change',
    ],
    roadmap: [
      'Practice asking "What do you think?" before stating your own view in the next 5 team meetings',
      'Delegate one recurring decision per month to a team member fully',
      'Run a monthly retro where the team critiques a decision you made',
      'Pair with a coach or peer to practice coaching questions instead of instructions',
    ],
  },
  collaborative: {
    key: 'collaborative',
    name: 'Collaborative Leader',
    tagline: 'Consensus-driven, inclusive',
    color: '#2563eb',
    description:
      'You involve the team in decisions, value diverse input, and build buy-in through discussion before moving forward.',
    strengths: [
      'High team engagement and psychological safety',
      'Decisions benefit from diverse perspectives',
      'Strong trust and loyalty within the team',
      'Good at building consensus across stakeholders',
    ],
    weaknesses: [
      'Decision-making can be slow when speed matters',
      'Risk of analysis paralysis or endless discussion',
      'Difficulty making unpopular but necessary calls',
      'Can be seen as indecisive under pressure',
    ],
    roadmap: [
      'Set a hard decision deadline before starting group discussions',
      'Practice making one fast, unilateral decision per week when the stakes are low',
      'Use a RACI framework so "collaborative" does not mean "everyone decides everything"',
      'Get comfortable communicating a decision the team disagreed with, and why',
    ],
  },
  handsOff: {
    key: 'handsOff',
    name: 'Delegative Leader',
    tagline: 'Autonomy-first, low intervention',
    color: '#16a34a',
    description:
      'You trust your team to own their work with minimal oversight, stepping in mainly when asked or when something goes off track.',
    strengths: [
      'Builds strong ownership and autonomy in the team',
      'Frees up senior contributors to do deep work',
      'Attracts and retains experienced, self-directed talent',
      'Avoids micromanagement fatigue',
    ],
    weaknesses: [
      'Junior or new team members may feel unsupported',
      'Problems can go unnoticed until they are serious',
      'Inconsistent standards across the team without check-ins',
      'Can be perceived as disengaged or absent',
    ],
    roadmap: [
      'Set up a lightweight weekly 15-minute check-in with each direct report',
      'Define 2-3 non-negotiable quality standards the team always follows',
      'Proactively ask about blockers instead of waiting to be told',
      'Create a simple escalation path so problems surface earlier',
    ],
  },
  transformational: {
    key: 'transformational',
    name: 'Visionary Leader',
    tagline: 'Big-picture, inspiration-driven',
    color: '#9333ea',
    description:
      'You lead through vision and inspiration, painting the "why" behind the work and motivating the team toward ambitious goals.',
    strengths: [
      'Inspires high motivation and a sense of purpose',
      'Strong at driving change and innovation',
      'Good at aligning the team to long-term goals',
      'Energizing presence during uncertain times',
    ],
    weaknesses: [
      'Day-to-day execution details can slip',
      'Team may struggle to translate vision into concrete tasks',
      'Can move on to the "next big idea" before finishing the current one',
      'Risk of overpromising or setting unrealistic timelines',
    ],
    roadmap: [
      'Pair every vision statement with a concrete first milestone and owner',
      'Set up a weekly operational review focused purely on execution status',
      'Practice finishing and celebrating one initiative before starting the next',
      'Ask a detail-oriented team member to co-plan rollout logistics with you',
    ],
  },
  eqLeader: {
    key: 'eqLeader',
    name: 'Emotionally Intelligent Leader',
    tagline: 'Empathy-driven, people-first',
    color: '#ea580c',
    description:
      'You lead by understanding people first: their motivations, stress levels, and needs. You adapt your approach to the person and moment, and empathy strongly shapes how you manage.',
    strengths: [
      'High trust and psychological safety on the team',
      'Skilled at reading and defusing team tension',
      'Adapts management approach to each individual',
      'Strong retention through genuine care for wellbeing',
    ],
    weaknesses: [
      'Can over-invest emotional energy and risk burnout',
      'May avoid necessary hard conversations to protect feelings',
      'Business outcomes can take a back seat to team harmony',
      'Boundaries between support and enabling can blur',
    ],
    roadmap: [
      'Practice pairing empathy with a clear, direct ask in feedback conversations',
      'Set explicit boundaries for your own availability to prevent burnout',
      'Use a structured feedback framework (e.g. SBI) to stay direct while staying kind',
      'Track team outcomes alongside team sentiment so both are visible',
    ],
  },
}

export const STYLE_ORDER = ['directive', 'collaborative', 'handsOff', 'transformational', 'eqLeader']
