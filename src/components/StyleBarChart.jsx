import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { STYLES, STYLE_ORDER } from '../data/styles'

export default function StyleBarChart({ percentages }) {
  const data = STYLE_ORDER.map((key) => ({
    name: STYLES[key].name.replace(' Leader', ''),
    score: percentages[key],
    fill: STYLES[key].color,
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={110} tick={{ fill: '#475569', fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="score" radius={[0, 6, 6, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
