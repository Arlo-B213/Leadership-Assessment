function buildMailto(toEmail, subject, body) {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${encodeURIComponent(toEmail)}?${params.toString().replace(/\+/g, '%20')}`
}

export function openResultsEmail({ toEmail, toName, dominantStyle, empathyScore, resultUrl }) {
  const subject = `${toName}'s Management Style Results: ${dominantStyle}`
  const body =
    `Hi ${toName},\n\n` +
    `Here are your Management Assessment results:\n\n` +
    `Dominant style: ${dominantStyle}\n` +
    `Empathy score: ${empathyScore}%\n\n` +
    `View full results and your roadmap here:\n${resultUrl}\n`
  window.location.href = buildMailto(toEmail, subject, body)
}

export function openFeedbackRequestEmail({ toEmail, requesterName, feedbackUrl }) {
  const subject = `Quick anonymous feedback for ${requesterName}?`
  const body =
    `Hi,\n\n` +
    `${requesterName} is asking for quick, anonymous feedback on their management style. ` +
    `It takes about 3 minutes and your individual answers aren't shown to them - only combined results.\n\n` +
    `Click below to give feedback:\n${feedbackUrl}\n`
  window.location.href = buildMailto(toEmail, subject, body)
}

export function openTeamInviteEmail({ toEmail, teamName, managerName, inviteUrl }) {
  const subject = `You're invited to join ${teamName} on Management Assessment`
  const body =
    `Hi,\n\n` +
    `${managerName} has invited you to take the Management Style Assessment as part of ${teamName}.\n\n` +
    `Click below to get started:\n${inviteUrl}\n\n` +
    `It takes about 8 minutes and covers 20 questions on management style, empathy, and leadership approach.\n`
  window.location.href = buildMailto(toEmail, subject, body)
}
