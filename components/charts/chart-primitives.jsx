"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompactCurrency, formatCurrency, formatNumber } from "@/lib/utils/format";

export function ChartTooltip({ active, payload, label, currency = true, suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <div className="chart-tooltip-row" key={entry.dataKey || entry.name}>
          <span className="chart-tooltip-dot" style={{ background: entry.color || entry.payload?.color }} />
          <span>{entry.name}</span>
          <strong>
            {currency
              ? formatCurrency(entry.value)
              : `${formatNumber(entry.value)}${suffix}`}
          </strong>
        </div>
      ))}
    </div>
  );
}

export function PortfolioPerformanceChart({ data, height = 280 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-600)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--brand-600)" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
          <YAxis
            tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={50}
            tickFormatter={(value) => formatCompactCurrency(value)}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border-strong)", strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="value"
            name="Portfolio value"
            stroke="var(--brand-600)"
            strokeWidth={2.4}
            fill="url(#portfolioValue)"
            activeDot={{ r: 4, strokeWidth: 2, fill: "var(--surface)" }}
          />
          <Line type="monotone" dataKey="invested" name="Capital invested" stroke="var(--gold)" strokeWidth={1.4} strokeDasharray="4 4" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AllocationDonut({ data, height = 250, centerLabel, centerValue }) {
  return (
    <div className="donut-wrap" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="66%"
            outerRadius="88%"
            paddingAngle={3}
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip currency={false} suffix="%" />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <span>{centerLabel}</span>
        <strong>{centerValue}</strong>
      </div>
    </div>
  );
}

export function GrowthLineChart({ data, height = 260, dataKey = "customers", secondKey = "active" }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
          <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} width={42} />
          <Tooltip content={<ChartTooltip currency={false} />} />
          <Line type="monotone" dataKey={dataKey} name="Registered" stroke="var(--brand-600)" strokeWidth={2.2} dot={false} />
          <Line type="monotone" dataKey={secondKey} name="Active" stroke="var(--gold)" strokeWidth={1.8} dot={false} strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InvestmentActivityChart({ data, height = 270 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={6}>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
          <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
          <Tooltip content={<ChartTooltip currency={false} />} cursor={{ fill: "var(--surface-2)" }} />
          <Bar dataKey="applications" name="Applications" fill="var(--brand-100)" radius={[6, 6, 0, 0]} maxBarSize={22} />
          <Bar dataKey="approved" name="Approved" fill="var(--brand-600)" radius={[6, 6, 0, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueChart({ data, height = 250 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
          <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 11 }} axisLine={false} tickLine={false} width={34} tickFormatter={(value) => `₦${value}m`} />
          <Tooltip content={<ChartTooltip currency={false} suffix="m" />} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="var(--gold)" strokeWidth={2.2} fill="url(#revenueFill)" />
          <Line type="monotone" dataKey="cost" name="Cost" stroke="var(--text-tertiary)" strokeWidth={1.4} dot={false} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ChartLegend({ items }) {
  return (
    <div className="chart-legend">
      {items.map((item) => (
        <span key={item.label}>
          <i style={{ background: item.color }} aria-hidden="true" />
          {item.label}
        </span>
      ))}
    </div>
  );
}
