// Shorter, peer-phrased subset used for anonymous 360 feedback.
// Same weights structure as data/questions.js so computeScores() works unchanged.

export const PEER_QUESTIONS = [
  {
    id: 'p1',
    dimension: 'Decision-Making',
    text: 'When a decision needs to be made quickly, they tend to...',
    options: [
      { id: 'a', text: 'Make the call themselves and inform the team', weights: { directive: 3 } },
      { id: 'b', text: 'Quickly poll a few trusted team members first', weights: { collaborative: 2, eqLeader: 1 }, empathy: 1 },
      { id: 'c', text: 'Let the person closest to the problem decide', weights: { handsOff: 3 } },
      { id: 'd', text: 'Connect the decision back to the bigger goal before deciding', weights: { transformational: 3 } },
      { id: 'e', text: 'Check how the decision will affect people\'s workload or stress first', weights: { eqLeader: 3 }, empathy: 3 },
    ],
  },
  {
    id: 'p2',
    dimension: 'Feedback & Recognition',
    text: 'When someone on the team does great work, they usually...',
    options: [
      { id: 'a', text: 'Tell them clearly and move on to the next priority', weights: { directive: 2 } },
      { id: 'b', text: 'Recognize it publicly in front of the team', weights: { collaborative: 2, transformational: 2 } },
      { id: 'c', text: 'Trust they already know and don\'t need to be told often', weights: { handsOff: 3 } },
      { id: 'd', text: 'Tie their success back to the team\'s larger mission', weights: { transformational: 3 } },
      { id: 'e', text: 'Ask how it felt and what support helped them get there', weights: { eqLeader: 3 }, empathy: 2 },
    ],
  },
  {
    id: 'p3',
    dimension: 'Conflict Resolution',
    text: 'When two team members disagree, they typically...',
    options: [
      { id: 'a', text: 'Step in and make a final ruling', weights: { directive: 3 } },
      { id: 'b', text: 'Facilitate a discussion until they reach agreement', weights: { collaborative: 3 } },
      { id: 'c', text: 'Let them work it out unless it escalates', weights: { handsOff: 3 } },
      { id: 'd', text: 'Reframe the conflict around shared goals', weights: { transformational: 2 } },
      { id: 'e', text: 'Talk to each person privately to understand how they feel first', weights: { eqLeader: 3 }, empathy: 3 },
    ],
  },
  {
    id: 'p4',
    dimension: 'Delegation',
    text: 'When assigning a new project, they usually...',
    options: [
      { id: 'a', text: 'Give specific instructions on how to do it', weights: { directive: 3 } },
      { id: 'b', text: 'Discuss the approach together before starting', weights: { collaborative: 3 } },
      { id: 'c', text: 'Hand over the outcome and let people choose the approach', weights: { handsOff: 3 } },
      { id: 'd', text: 'Explain why the project matters for the bigger picture', weights: { transformational: 3 } },
      { id: 'e', text: 'Consider who would find this project most energizing right now', weights: { eqLeader: 2 }, empathy: 2 },
    ],
  },
  {
    id: 'p5',
    dimension: 'Accountability',
    text: 'When someone misses a deadline, their first move is to...',
    options: [
      { id: 'a', text: 'Address it directly and reset expectations', weights: { directive: 3 } },
      { id: 'b', text: 'Discuss as a team what went wrong in the process', weights: { collaborative: 2 } },
      { id: 'c', text: 'Assume it\'s handled and wait to hear from them', weights: { handsOff: 2 } },
      { id: 'd', text: 'Remind them how it connects to the bigger goal', weights: { transformational: 2 } },
      { id: 'e', text: 'Ask what got in the way before addressing the miss', weights: { eqLeader: 3 }, empathy: 3 },
    ],
  },
  {
    id: 'p6',
    dimension: 'Wellbeing',
    text: 'When someone on the team seems stressed or burnt out, they...',
    options: [
      { id: 'a', text: 'Help them reprioritize their task list', weights: { directive: 2 } },
      { id: 'b', text: 'Ask the team how to redistribute the load', weights: { collaborative: 2 } },
      { id: 'c', text: 'Trust them to raise it if it becomes a real problem', weights: { handsOff: 2 } },
      { id: 'd', text: 'Remind them why the hard work matters right now', weights: { transformational: 1 } },
      { id: 'e', text: 'Check in privately and ask what kind of support they need', weights: { eqLeader: 3 }, empathy: 3 },
    ],
  },
  {
    id: 'p7',
    dimension: 'Trust Building',
    text: 'They build trust with the team mainly by...',
    options: [
      { id: 'a', text: 'Being consistent and following through on commitments', weights: { directive: 2 } },
      { id: 'b', text: 'Being transparent and involving people in decisions', weights: { collaborative: 3 } },
      { id: 'c', text: 'Giving real autonomy and not micromanaging', weights: { handsOff: 3 } },
      { id: 'd', text: 'Showing genuine conviction in where the team is headed', weights: { transformational: 2 } },
      { id: 'e', text: 'Genuinely listening and remembering what matters to each person', weights: { eqLeader: 3 }, empathy: 3 },
    ],
  },
  {
    id: 'p8',
    dimension: 'Vision & Strategy',
    text: 'When communicating strategy to the team, they...',
    options: [
      { id: 'a', text: 'Lay out exactly what needs to happen and by when', weights: { directive: 3 } },
      { id: 'b', text: 'Workshop the strategy together with the team', weights: { collaborative: 3 } },
      { id: 'c', text: 'Share the destination and trust the team to chart the path', weights: { handsOff: 2 } },
      { id: 'd', text: 'Tell a compelling story about where things are headed and why', weights: { transformational: 3 } },
      { id: 'e', text: 'Make sure the strategy feels realistic given the team\'s capacity', weights: { eqLeader: 2 }, empathy: 2 },
    ],
  },
]
