import { Card, Col, Progress, Row, Typography } from "antd";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
const DashboardCards = ({ totalData }) => {
  const { Title, Text } = Typography;
  return (
    <>
      <div className="w-full mb-10">
        <Row gutter={16}>
          <Col span={6}>
            <Card className="bg-purple-600">
              <Title level={5} style={{ color: "white" }}>
                TOTAL BALANCE
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.balance}
                </Title>
              </Title>
              <Text style={{ color: "white" }}> +6% since last month </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-blue-500">
              <Title level={5} style={{ color: "white" }}>
                TOTAL INCOME
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.total_income}
                </Title>
              </Title>
              <Text style={{ color: "white" }}> +6% since last month </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-red-500">
              <Title level={5} style={{ color: "white" }}>
                TOTAL EXPENSE
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.total_expense}
                </Title>
              </Title>
              <Text
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FaArrowDownLong className="mr-1" />
                -6% since last month
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-green-500">
              <Title level={5} style={{ color: "white" }}>
                TOTAL SAVINGS
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.total_saving}
                </Title>
              </Title>
              <Text style={{ color: "white" }}>Goal met for current month</Text>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardCards;
