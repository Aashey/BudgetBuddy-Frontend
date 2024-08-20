import Chart from "react-apexcharts";
import { useMemo } from "react";

const BalanceChart = ({
  chartData,
  chartLoading,
  chartError,
  chartRefetch,
}) => {
  const { opening_balance: openingBalance, closing_balance: closingBalance } =
    chartData?.data?.balance_chart;
  const openingClosingSeries = useMemo(
    () => [
      {
        name: "Opening Balance",
        data: openingBalance,
      },
      {
        name: "Closing Balance",
        data: closingBalance,
      },
    ],
    [openingBalance, closingBalance]
  );

  const openingClosingOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      markers: {
        size: 5,
      },
      grid: {
        show: true,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 0.5,
        strokeDashArray: 0,
        row: {
          colors: ["transparent", "transparent"],
        },
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      colors: ["#12CBC4", "#ED4C67"],
    }),
    []
  );
  return (
    <div className="p-4">
      <Chart
        options={openingClosingOptions}
        series={openingClosingSeries}
        type="line"
        height={300}
      />
    </div>
  );
};

export default BalanceChart;
