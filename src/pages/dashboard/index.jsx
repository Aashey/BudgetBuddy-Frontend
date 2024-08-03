import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import { useGetChartData } from "./services/useChartData";
import { useGetTotalData } from "./services/useTotalData";

const Dashboard = () => {
  const { data: chartData } = useGetChartData();
  const { data: totalData } = useGetTotalData();

  const incomeData = chartData?.data?.income_data;
  const expenseData = chartData?.data?.expense_data;
  const savingData = chartData?.data?.saving_data;
  const withdrawData = chartData?.data?.withdraw_data;

  return (
    <>
      <DashboardCards totalData={totalData?.data?.data} />
      <DashboardCharts
        incomeData={incomeData}
        expenseData={expenseData}
        savingData={savingData}
        withdrawData={withdrawData}
      />
    </>
  );
};

export default Dashboard;
