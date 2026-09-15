export default function QuestionCard({ question, selectedIds, onToggle }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide mb-2">
        {question.dimension}
      </p>
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">{question.text}</h2>
      <p className="text-sm text-slate-400 mb-5">Select all that apply</p>

      <div className="space-y-2">
        {question.options.map((opt) => {
          const checked = selectedIds.includes(opt.id)
          return (
            <label
              key={opt.id}
              className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                checked ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(question.id, opt.id)}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />
              <span className="text-sm text-slate-700">{opt.text}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
