export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-slate-500 mb-2">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
