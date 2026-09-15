import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { STYLES, STYLE_ORDER } from '../data/styles'

export default function StyleRadarChart({ percentages }) {
  const data = STYLE_ORDER.map((key) => ({
    style: STYLES[key].name.replace(' Leader', ''),
    score: percentages[key],
  }))

  return (
    <div className="h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="style" tick={{ fill: '#475569', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <Radar name="Score" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
