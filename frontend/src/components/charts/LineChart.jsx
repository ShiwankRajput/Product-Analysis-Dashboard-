import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const FeatureLineChart = ({ data }) => {

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white shadow-sm p-2 rounded border"
          style={{ fontSize: "14px" }}
        >
          <strong>{label}</strong>
          <div>Clicks: {payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>

        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>

          {/* GRID */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e9ecef"
          />

          {/* X AXIS */}
          <XAxis
            dataKey="_id"
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />

          {/* Y AXIS */}
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#6c757d"
          />

          {/* TOOLTIP */}
          <Tooltip content={<CustomTooltip />} />

          {/* LINE */}
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#0d6efd"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={600}
          />

        </LineChart>

      </ResponsiveContainer>
    </div>
  );
};

export default FeatureLineChart;