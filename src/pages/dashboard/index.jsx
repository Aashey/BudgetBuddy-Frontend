import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import DashboardTransaction from "../../components/dashboard/DashboardTransaction";
import { formatDate } from "../../helper/formatDate";
import { useGetChartData } from "./services/useChartData";
import { useGetTotalData } from "./services/useTotalData";
import { Card, Divider, Table, Tag, Typography } from "antd";

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
      <div className="custom-font rounded-xl mb-4 border-gray-200">
        <div className="bg-[#D3D3D3] px-4 py-2 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <Title level={3}>Hey, User</Title>
            <Text className="custom-font text-black">
              {formatDate(Date())}
            </Text>
          </div>
          <DashboardCards totalData={totalData?.data?.data} />
        </div>
      </div>

      <DashboardCharts
        incomeData={incomeData}
        expenseData={expenseData}
        savingData={savingData}
        withdrawData={withdrawData}
        totalData={totalData?.data?.data}
      />

      <Card
        title={<Title level={5}>Recent Transactions</Title>}
        className="mt-4 rounded-2xl border-gray-200 shadow-md"
      >
        <DashboardTransaction />
      </Card>
    </>
  );
};

export default Dashboard;
