import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import DashboardTransaction from "../../components/dashboard/DashboardTransaction";
import { formatDate } from "../../helper/formatDate";
import { useGetTotalData } from "./services/useTotalData";
import { Card, Divider, Table, Tag, Typography } from "antd";

const Dashboard = () => {
  const { data: totalData } = useGetTotalData();

  const { Title, Text } = Typography;
console.log(totalData);
  const incomeData = totalData?.data?.data?.charts_data?.income_data;
  const expenseData = totalData?.data?.data?.charts_data?.expense_data;

  return (
    <>
      <div className="custom-font py-4 mb-4">
        <div className="px-4">
          <div className="flex justify-between">
            <Title level={3}>Dashboard</Title>
            <Text className="custom-font text-black">
              <div className="flex flex-col">
                <span>Manoj</span>
                <span>{formatDate(Date())}</span>
              </div>
            </Text>
          </div>
          <DashboardCards totalData={totalData?.data?.data?.financial_data} />
        </div>
      </div>
      <div className="px-4">
        <DashboardCharts
          incomeData={incomeData}
          expenseData={expenseData}
          totalData={totalData?.data?.data?.financial_data}
        />

        <Card
          title={<Title level={5}>Recent Transactions</Title>}
          className="mt-4 mb-4 rounded-2xl border-gray-200 shadow-md"
        >
          <DashboardTransaction />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
