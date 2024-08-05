import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import { formatDate } from "../../helper/formatDate";
import { useGetChartData } from "./services/useChartData";
import { useGetTotalData } from "./services/useTotalData";
import { Card, Divider, Typography } from "antd";

const Dashboard = () => {
  const { data: chartData } = useGetChartData();
  const { data: totalData } = useGetTotalData();
  const { Title, Text } = Typography;

  const incomeData = chartData?.data?.income_data;
  const expenseData = chartData?.data?.expense_data;
  const savingData = chartData?.data?.saving_data;
  const withdrawData = chartData?.data?.withdraw_data;

  return (
    <>
      <div className="custom-font bg-[#EDEDFA] rounded-xl px-4 py-2 mb-2">
        <Title level={3}>Hey, User</Title>
        <Text className="custom-font text-gray-700">{formatDate(Date())}</Text>

        <DashboardCards totalData={totalData?.data?.data} />
      </div>
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
