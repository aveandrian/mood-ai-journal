'use client'

import { Analysis } from '@prisma/client'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent'

const CustomTooltip = ({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  if (active) {
    const analysis = payload?.[0].payload

    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-sm"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    )
  }
  return null
}

const HistoryChart = ({ data }: { data: Analysis[] }) => {
  const formatXAxis = (tickItem: string) => {
    const dateLabel = new Date(tickItem).toLocaleString('en-us', {
      year: '2-digit',
      day: '2-digit',
      month: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    })
    return dateLabel
  }
  return (
    <ResponsiveContainer minHeight={800}>
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#000000"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" tickFormatter={formatXAxis} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
