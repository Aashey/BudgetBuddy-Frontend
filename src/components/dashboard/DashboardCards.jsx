import { Card, Col, Progress, Row, Typography } from "antd";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { iconSwitcher } from "../../helper/iconSwitcher";
const DashboardCards = ({ totalData }) => {
  console.log(totalData);
  const { Title, Text } = Typography;
  return (
    <>
      {/* <div className="w-full mb-10"> */}
      {/* <Row gutter={16}>
          <Col span={6}>
            <Card className="bg-blue-600">
              <Title level={5} style={{ color: "white" }}>
                TOTAL BALANCE
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.current_month?.balance}
                </Title>
              </Title>
              <Text style={{ color: "white" }}>
                {totalData?.percentage_changes?.balance && (
                  <>
                    {" "}
                    {totalData?.percentage_changes?.balance}% since last month
                  </>
                )}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-green-600">
              <Title level={5} style={{ color: "white" }}>
                TOTAL INCOME
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.current_month?.total_income}
                </Title>
              </Title>
              <Text style={{ color: "white" }}>
                {totalData?.percentage_changes?.total_income && (
                  <>
                    {" "}
                    {totalData?.percentage_changes?.total_income}% since last
                    month
                  </>
                )}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-red-500">
              <Title level={5} style={{ color: "white" }}>
                TOTAL EXPENSE
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.current_month?.total_expense}
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
                {totalData?.percentage_changes?.total_expense && (
                  <>
                    {totalData?.percentage_changes?.total_expense}% since last
                    month
                  </>
                )}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="bg-amber-600">
              <Title level={5} style={{ color: "white" }}>
                TOTAL SAVINGS
                <Title style={{ color: "white" }} level={2}>
                  Rs. {totalData?.current_month?.total_saving}
                </Title>
              </Title>
              <Text style={{ color: "white" }}>
                {totalData?.percentage_changes?.total_saving && (
                  <>
                    {totalData?.percentage_changes?.total_saving}% since last
                    month
                  </>
                )}
              </Text>
            </Card>
          </Col>
        </Row> */}
      {/* </div> */}
      <div className="grid mt-2 grid-flow-col gap-6 mb-2 grid-flow-col-dense">
        <div className="grid-cols-3 bg-white shadow-md p-2 rounded-xl">
          <Title level={5} style={{ color: "#2563EB" }}>
            TOTAL BALANCE
            <Title level={4}>Rs. {totalData?.current_month?.balance}</Title>
          </Title>
          <Text style={{ color: "gray" }}>
            {totalData?.percentage_changes?.balance && (
              <> {totalData?.percentage_changes?.balance}% since last month</>
            )}
          </Text>
        </div>

        <div className=" grid-cols-3 bg-white shadow-md p-2 rounded-xl">
          <Title level={5} style={{ color: "#16A34A" }}>
            TOTAL INCOME
            <Title level={4}>
              Rs. {totalData?.current_month?.total_income}
            </Title>
          </Title>
          <Text style={{ color: "gray" }}>
            {totalData?.percentage_changes?.total_income && (
              <>
                {" "}
                {totalData?.percentage_changes?.total_income}% since last month
              </>
            )}
          </Text>
        </div>
        <div className="grid-cols-3 bg-white shadow-md p-2 rounded-xl">
          <Title level={5} style={{ color: "#EF4444" }}>
            TOTAL EXPENSE
            <Title level={4}>
              Rs. {totalData?.current_month?.total_expense}
            </Title>
          </Title>
          <Text
            style={{
              color: "gray",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {totalData?.percentage_changes?.total_expense && (
              <>
                {totalData?.percentage_changes?.total_expense}% since last month
              </>
            )}
          </Text>
        </div>
        <div className="grid-cols-3 bg-white shadow-md p-2 rounded-xl">
          <Title level={5} style={{ color: "#D97706" }}>
            TOTAL SAVINGS
            <Title level={4}>
              Rs. {totalData?.current_month?.total_saving}
            </Title>
          </Title>
          <Text style={{ color: "gray" }}>
            {totalData?.percentage_changes?.total_saving && (
              <>
                {totalData?.percentage_changes?.total_saving}% since last month
              </>
            )}
          </Text>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
