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
      <div className="custom-font bg-[#EDEDFA] rounded-xl px-4 py-2 mb-2">
        {/* <Title level={3}>Hey, User</Title> */}
        {/* <Text className="custom-font text-gray-700">{formatDate(Date())}</Text> */}

        <DashboardCards totalData={totalData?.data?.data} />
      </div>

      <Card className="mt-4 sha rounded-2xl p-0">
        <DashboardCharts
          incomeData={incomeData}
          expenseData={expenseData}
          savingData={savingData}
          withdrawData={withdrawData}
          totalData={totalData?.data?.data}
        />
      </Card>

      <Card className="mt-4 rounded-2xl">
        <Title level={5}>Recent Transactions</Title>
        <DashboardTransaction />
      </Card>
    </>
  );
};

export default Dashboard;
