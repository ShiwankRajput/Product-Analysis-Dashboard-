import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const FeatureBarChart = ({ data, onBarClick }) => {

  // Custom Tooltip
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

        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >

          {/* GRID */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e9ecef"
          />

          {/* X AXIS */}
          <XAxis
            dataKey="featureName"
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

          {/* BAR */}
          <Bar
            dataKey="totalClicks"
            fill="#0d6efd"
            radius={[6, 6, 0, 0]}
            animationDuration={600}
            cursor="pointer"
            onClick={(entry) =>
              onBarClick(entry.featureName)
            }
          />

        </BarChart>

      </ResponsiveContainer>
    </div>
  );
};

export default FeatureBarChart;