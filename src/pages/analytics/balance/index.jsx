import BalanceChart from "../../../components/analytics/BalanceChart";
import BalanceCards from "../../../components/analytics/BalanceCards";
import BalanceTable from "../../../components/analytics/BalanceTable";
import { useBalanceChart, useBalanceOverview } from "../services/useAnalytics";

const BalanceOverview = () => {
  const { data, isLoading, error, refetch } = useBalanceOverview();
  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
    refetch: chartRefetch,
  } = useBalanceChart();
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <BalanceCards
          cardData={data?.data[data?.data?.length - 1]}
          isLoading={isLoading}
          refetch={refetch}
        />
      )}

      {chartLoading ? (
        ""
      ) : (
        <BalanceChart
          chartData={chartData}
          chartLoading={chartLoading}
          chartError={chartError}
          chartRefetch={chartRefetch}
        />
      )}
      <BalanceTable
        tableData={data?.data}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
};

export default BalanceOverview;
