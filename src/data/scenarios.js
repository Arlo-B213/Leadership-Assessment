// Branching leadership scenarios. Each first choice reveals a complication
// (followUp), then a second choice yields coaching feedback tied to a style.

export const SCENARIOS = [
  {
    id: 's1',
    title: 'The Missed Deadline',
    situation:
      'A key project is due Friday. On Wednesday, your lead engineer tells you it won\'t be ready until the following Tuesday.',
    choices: [
      {
        id: 'a',
        text: 'Tell them the deadline is firm and ask what it takes to hit it',
        followUp:
          'They stay late two nights and ship Friday, but seem exhausted and quieter than usual in the following days.',
        options: [
          { id: '1', text: 'Check in on how they\'re doing before assigning the next project', feedback: 'Good recovery — pairing a firm deadline with a genuine follow-up on their wellbeing prevents burnout from becoming a pattern.', style: 'eqLeader' },
          { id: '2', text: 'Move straight to the next priority', feedback: 'The deadline got hit, but unaddressed exhaustion compounds. A quick check-in costs little and prevents quiet burnout.', style: 'directive' },
        ],
      },
      {
        id: 'b',
        text: 'Ask what\'s blocking them and problem-solve together',
        followUp:
          'Turns out a dependency from another team is the real blocker. Fixing it will take a few days regardless of effort.',
        options: [
          { id: '1', text: 'Escalate to the other team\'s lead and reset stakeholder expectations', feedback: 'Strong move — you found the real constraint and addressed it at the source instead of pushing your own team harder for no reason.', style: 'collaborative' },
          { id: '2', text: 'Ask your engineer to push through anyway', feedback: 'Pushing on a dependency you don\'t control usually just produces stress without changing the actual timeline.', style: 'directive' },
        ],
      },
    ],
  },
  {
    id: 's2',
    title: 'The Quiet Team Member',
    situation:
      'In team meetings, one strong performer never speaks up. In 1:1s they have sharp opinions, but they go silent in the group.',
    choices: [
      {
        id: 'a',
        text: 'Call on them directly in the next meeting to share their view',
        followUp:
          'Put on the spot, they freeze and give a vague answer. Afterward they seem uncomfortable.',
        options: [
          { id: '1', text: 'Apologize privately and ask how they\'d prefer to contribute', feedback: 'Recovering well — adapting your approach to how someone actually processes things builds more trust than the original ask cost you.', style: 'eqLeader' },
          { id: '2', text: 'Keep calling on them so they get used to it', feedback: 'Repeated public pressure on someone who freezes under it usually trains them to shut down further, not speak up more.', style: 'directive' },
        ],
      },
      {
        id: 'b',
        text: 'Ask them privately what would make speaking up in the group easier',
        followUp:
          'They say they think better in writing and get talked over when they pause to think.',
        options: [
          { id: '1', text: 'Add a written pre-read or async input option before meetings', feedback: 'This directly removes their actual barrier — a small process change that lets a strong contributor actually contribute.', style: 'eqLeader' },
          { id: '2', text: 'Tell the team to be more patient in meetings and move on', feedback: 'A general reminder rarely changes real-time group dynamics. The written option would have addressed the actual root cause.', style: 'collaborative' },
        ],
      },
    ],
  },
  {
    id: 's3',
    title: 'The Unpopular Change',
    situation:
      'Leadership just announced a return-to-office policy your team strongly dislikes. You have to roll it out to your team tomorrow.',
    choices: [
      {
        id: 'a',
        text: 'Present the policy clearly and explain it\'s not up for debate',
        followUp:
          'The team goes quiet in the meeting, but morale visibly drops over the following week and one person mentions job searching.',
        options: [
          { id: '1', text: 'Set up 1:1s to hear individual concerns even though the policy won\'t change', feedback: 'Even when you can\'t change the outcome, being heard changes how people experience it. This limits further damage.', style: 'eqLeader' },
          { id: '2', text: 'Assume it will blow over and say nothing further', feedback: 'Unaddressed resentment about a top-down change tends to surface as attrition rather than fade on its own.', style: 'directive' },
        ],
      },
      {
        id: 'b',
        text: 'Acknowledge it\'s unpopular and ask for input on how to implement it',
        followUp:
          'The team proposes a flexible hybrid interpretation that technically complies but keeps most people happy.',
        options: [
          { id: '1', text: 'Take the proposal to leadership and advocate for it', feedback: 'You turned a mandate you couldn\'t control into a problem the team helped solve — strong use of collaborative leadership within real constraints.', style: 'collaborative' },
          { id: '2', text: 'Implement it exactly as leadership specified, ignoring the proposal', feedback: 'Asking for input and then discarding it usually damages trust more than not asking at all would have.', style: 'directive' },
        ],
      },
    ],
  },
  {
    id: 's4',
    title: 'The Rising Star Who Wants More',
    situation:
      'Your best performer asks for a promotion. You agree they deserve it, but there\'s no budget approved for six months.',
    choices: [
      {
        id: 'a',
        text: 'Be direct: no budget, but you\'ll advocate for it in six months',
        followUp:
          'They thank you but you later learn they\'ve started interviewing elsewhere.',
        options: [
          { id: '1', text: 'Proactively check in on what would keep them engaged in the meantime', feedback: 'Honesty alone isn\'t retention. Following up on their underlying need (growth, recognition) is what actually keeps strong people.', style: 'eqLeader' },
          { id: '2', text: 'Let it play out and see what happens', feedback: 'Losing your best performer over a timing gap is often avoidable with a small proactive gesture in the interim.', style: 'handsOff' },
        ],
      },
      {
        id: 'b',
        text: 'Paint a picture of the growth path and what the next 6 months could build toward',
        followUp:
          'They\'re energized short-term, but three months in, nothing concrete has changed and they seem to be losing faith in the plan.',
        options: [
          { id: '1', text: 'Check in at the halfway point with a concrete update, even if it\'s "still on track"', feedback: 'Vision without a checkpoint reads as empty after a while. A concrete mid-point update keeps the story credible.', style: 'transformational' },
          { id: '2', text: 'Assume the initial conversation was enough motivation', feedback: 'A single inspiring conversation fades fast without reinforcement — especially when the promised timeline stretches on.', style: 'transformational' },
        ],
      },
    ],
  },
  {
    id: 's5',
    title: 'The Mistake That Cost Money',
    situation:
      'A team member\'s error caused a costly production incident. They\'re clearly shaken and worried about their job.',
    choices: [
      {
        id: 'a',
        text: 'Focus the conversation on what happened and how to prevent it',
        followUp:
          'They give you a clear, professional postmortem, but seem to be holding back and avoid eye contact.',
        options: [
          { id: '1', text: 'Pause and ask directly how they\'re feeling about it', feedback: 'Facts alone don\'t address the fear underneath. A direct, human check-in often unlocks what a purely technical debrief misses.', style: 'eqLeader' },
          { id: '2', text: 'Move on once the technical postmortem is done', feedback: 'The incident is documented, but an unaddressed fear of "am I going to get fired" tends to quietly erode confidence and risk-taking.', style: 'directive' },
        ],
      },
      {
        id: 'b',
        text: 'Reassure them first, then work through what happened together',
        followUp:
          'They relax and give an honest, detailed account — including a second smaller issue they\'d been afraid to mention.',
        options: [
          { id: '1', text: 'Thank them for the honesty and reinforce that surfacing issues early is valued', feedback: 'This is how you build a team that self-reports problems early instead of hiding them — a compounding advantage over time.', style: 'eqLeader' },
          { id: '2', text: 'Note the second issue but don\'t comment on the honesty', feedback: 'You got the information, but missed a cheap opportunity to reinforce the exact behavior (early honesty) you want more of.', style: 'collaborative' },
        ],
      },
    ],
  },
]
