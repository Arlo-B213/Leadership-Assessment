import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts'

export default function GaugeChart({ value, label, color = '#4f46e5' }) {
  const data = [{ name: label, value, fill: color }]

  return (
    <div className="h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={12} angleAxisId={0} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{value}%</span>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
    </div>
  )
}
