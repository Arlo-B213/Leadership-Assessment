// Runs on a schedule via GitHub Actions (.github/workflows/checkin-reminders.yml).
// Finds roadmap commitments whose 7-day check-in is due and emails the owner
// a reminder, then marks them so the same commitment isn't emailed twice.
// The in-app CheckInBanner still handles the actual "did you do it?" response.

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'

// CI passes the key as a JSON string (FIREBASE_SERVICE_ACCOUNT); local runs
// can instead point FIREBASE_SERVICE_ACCOUNT_FILE at a gitignored key file.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_FILE
  ? JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_FILE, 'utf8'))
  : JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

const app = initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore(app)
const auth = getAuth(app)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const APP_URL = process.env.APP_URL || 'https://arlo-b213.github.io/Leadership-Assessment/'

async function main() {
  const now = new Date()
  const snap = await db
    .collection('commitments')
    .where('status', '==', 'pending')
    .where('checkInAt', '<=', now.toISOString())
    .get()

  const due = snap.docs.map((d) => d.data()).filter((c) => !c.reminderSentAt)

  console.log(`Found ${due.length} due commitment(s) without a reminder sent.`)

  for (const commitment of due) {
    try {
      const user = await auth.getUser(commitment.ownerUid)
      if (!user.email) {
        console.log(`Skipping ${commitment.id} - no email on file for ${commitment.ownerUid}`)
        continue
      }

      await transporter.sendMail({
        from: `"Management Assessment" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: 'Check-in: did you try what you committed to?',
        text:
          `A week ago you committed to:\n\n"${commitment.text}"\n\n` +
          `Open the app to log whether you followed through:\n${APP_URL}\n`,
        html:
          `<p>A week ago you committed to:</p>` +
          `<blockquote style="margin:0;padding:12px 16px;background:#f4f4f7;border-left:3px solid #4f46e5;">${escapeHtml(commitment.text)}</blockquote>` +
          `<p><a href="${APP_URL}">Open the app</a> to log whether you followed through.</p>`,
      })

      await db.collection('commitments').doc(commitment.id).update({
        reminderSentAt: now.toISOString(),
      })

      console.log(`Sent reminder for commitment ${commitment.id} to ${user.email}`)
    } catch (err) {
      console.error(`Failed to process commitment ${commitment.id}:`, err.message)
    }
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
