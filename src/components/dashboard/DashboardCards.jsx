import { Card, Col, Progress, Row, Typography } from "antd";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { iconSwitcher } from "../../helper/iconSwitcher";
import CountUp from "react-countup";
const DashboardCards = ({ totalData, goalPercentage }) => {
  console.log("TOTAD CARD DATA", totalData);
  const { Title, Text } = Typography;
  return (
    <>
      <div className="grid mt-2 grid-flow-col gap-6 mb-2 grid-flow-col-dense">
        <div className="grid-cols-3 bg-white shadow-md p-4 rounded-2xl border-gray-200">
          <Title level={5} style={{ color: "#2563EB" }}>
            TOTAL BALANCE
            <Title level={4}>
              <CountUp
                prefix="रु. "
                duration={0.8}
                end={totalData?.current_month?.balance}
              />
            </Title>
          </Title>
          <Text style={{ color: "gray" }}>
            {totalData?.percentage_changes?.balance && (
              <>
                {" "}
                {totalData?.percentage_changes?.balance < 0 ? "" : "+"}
                {totalData?.percentage_changes?.balance}% since last month{" "}
              </>
            )}
          </Text>
        </div>

        <div className=" grid-cols-3 bg-white shadow-md p-4 rounded-2xl border-gray-200">
          <Title level={5} style={{ color: "#16A34A" }}>
            TOTAL INCOME
            <Title level={4}>
              <CountUp
                prefix="रु. "
                duration={0.8}
                end={totalData?.current_month?.total_income}
              />
            </Title>
          </Title>
          <Text style={{ color: "gray" }}>
            {totalData?.percentage_changes?.total_income && (
              <>
                {" "}
                {totalData?.percentage_changes?.total_income < 0 ? "" : "+"}
                {totalData?.percentage_changes?.total_income}% since last month
              </>
            )}
          </Text>
        </div>
        <div className="grid-cols-3 bg-white shadow-md p-4 rounded-2xl border-gray-200">
          <Title level={5} style={{ color: "#EF4444" }}>
            TOTAL EXPENSE
            <Title level={4}>
              <CountUp
                prefix="रु. "
                duration={0.8}
                end={totalData?.current_month?.total_expense}
              />
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
                {totalData?.percentage_changes?.total_expense < 0 ? "" : "+"}
                {totalData?.percentage_changes?.total_expense}% since last month
              </>
            )}
          </Text>
        </div>
        <div className="grid-cols-3 bg-white shadow-md p-4 rounded-2xl border-gray-200">
          <Title level={5} style={{ color: "#D97706" }}>
            TOTAL SAVINGS
            <Title level={4}>
              <CountUp
                prefix="रु. "
                duration={0.8}
                end={totalData?.current_month?.total_saving}
              />
            </Title>
          </Title>
          {totalData?.current_month_goal > 0 && (
            <Progress percent={goalPercentage} />
          )}
          <Text
            style={{
              color: "gray",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <span>
              {totalData?.current_month_goal > 0 ? (
                <>
                  {Number(totalData?.current_month?.total_saving) >= Number(totalData?.current_month_goal) ? (
                    "Saving Goal Reached."
                  ) : (
                    <>
                      <CountUp
                        duration={0.8}
                        end={Number(totalData?.current_month?.total_saving)}
                      />{" "}
                      /{" "}
                      <CountUp
                        duration={0.8}
                        end={Number(totalData?.current_month_goal)}
                      />{" "}
                      Reached
                    </>
                  )}
                </>
              ) : (
                "Saving target not yet set."
              )}
            </span>
          </Text>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
