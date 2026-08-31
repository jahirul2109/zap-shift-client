import {
    Pie,
    PieChart,
    Sector,
    Tooltip,
} from "recharts";

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}) => {
    const RADIAN = Math.PI / 180;

    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));

    const sx =
        (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;

    const sy =
        (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;

    const mx =
        (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;

    const my =
        (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;

    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    const textAnchor = cos >= 0 ? "start" : "end";
    const formatStatus = (status) => {
        if (!status) return payload.name;
        return status
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <g>
            {/* Center Text */}
            <text
                x={cx}
                y={cy}
                dy={8}
                textAnchor="middle"
                fill={fill}
                className="font-semibold"
            >
                {payload.name}
            </text>

            {/* Main sector */}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            {/* Active border */}
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />

            {/* Connector line */}
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />

            <circle
                cx={ex}
                cy={ey}
                r={2}
                fill={fill}
                stroke="none"
            />
            {/* Value */}
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >
                {formatStatus(payload?.name)}
            </text>

            {/* Percentage */}
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`${((percent ?? 0) * 100).toFixed(2)}%`}
            </text>
        </g>
    );
};

const Charts = ({ data, isAnimationActive = true, }) => {
    const colors = {
        delivered: "#22c55e",
        pending_pickup: "#f59e0b",
        rider_assigned: "#3b82f6",
        parcel_created: "#ef4444",
    };

    const chartData = data?.map((item) => ({
        name: item._id,
        value: item.count,
        fill: colors[item._id]
    }))
    console.log(data)
    return (
        <PieChart
            style={{
                width: "100%",
                maxHeight: "350px",
                aspectRatio: 1,
            }}
            responsive
            margin={{
                top: 50,
                right: 120,
                bottom: 0,
                left: 120,
            }}
        >
            <Pie
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                dataKey="value"
                isAnimationActive={isAnimationActive}
            />

            <Tooltip content={() => null} />
        </PieChart>
    )
}

export default Charts