import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { STYLES, STYLE_ORDER } from '../data/styles'

export default function TrendChart({ results }) {
  const data = results.map((r, i) => {
    const point = {
      attempt: `#${i + 1}`,
      date: new Date(r.createdAt).toLocaleDateString(),
      empathy: r.scores.empathyScore,
    }
    STYLE_ORDER.forEach((key) => {
      point[key] = r.scores.percentages[key]
    })
    return point
  })

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="attempt" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label} formatter={(v) => `${v}%`} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {STYLE_ORDER.map((key) => (
            <Line key={key} type="monotone" dataKey={key} name={STYLES[key].name.replace(' Leader', '')} stroke={STYLES[key].color} strokeWidth={2} dot={{ r: 3 }} />
          ))}
          <Line type="monotone" dataKey="empathy" name="Empathy" stroke="#0891b2" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
