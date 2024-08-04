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
      <div className="bg-[#EDEDFA] rounded-xl p-4 mb-4">
        <Title level={3}>Hey, Aashey</Title>
        <Text className="text-gray-700">{formatDate(Date())}</Text>

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
