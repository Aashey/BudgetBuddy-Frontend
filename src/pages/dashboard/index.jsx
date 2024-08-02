import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import { useGetChartData } from "./services/useChartData";
import { useGetTotalData } from "./services/useTotalData";

const Dashboard = () => {
  const { data: chartData } = useGetChartData();
  const { data: totalData } = useGetTotalData();

  const incomeData = chartData?.data?.income_data;
  const expenseData = chartData?.data?.expense_data;

  console.log("Total Data: ", totalData?.data?.data);
  return (
    <>
      <DashboardCards totalData={totalData?.data?.data?.current_month} />
      <DashboardCharts incomeData={incomeData} expenseData={expenseData} />
    </>
  );
};

export default Dashboard;
