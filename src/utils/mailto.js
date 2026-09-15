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

export function openTeamInviteEmail({ toEmail, teamName, managerName, inviteUrl }) {
  const subject = `You're invited to join ${teamName} on Management Assessment`
  const body =
    `Hi,\n\n` +
    `${managerName} has invited you to take the Management Style Assessment as part of ${teamName}.\n\n` +
    `Click below to get started:\n${inviteUrl}\n\n` +
    `It takes about 8 minutes and covers 20 questions on management style, empathy, and leadership approach.\n`
  window.location.href = buildMailto(toEmail, subject, body)
}
