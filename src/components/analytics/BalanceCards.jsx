import { Card, Typography } from "antd";

const BalanceCards = ({ cardData, isLoading, refetch }) => {
  const { Text, Title } = Typography;
  console.log(cardData);
  const {
    month,
    opening_balance,
    closing_balance,
    total_income,
    total_expense,
    saving_balance,
    total_saving,
    total_withdraw,
  } = cardData;
  console.table(month, opening_balance);
  return (
    <>
      <div className="flex justify-start items-center gap-6 flex-wrap p-4">
        <Card className="shadow-md" title={"Opening Balance"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {opening_balance}
          </Text>
        </Card>
        <Card className="shadow-md" title={"Closing Balance"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {closing_balance}
          </Text>{" "}
        </Card>
        <Card className="shadow-md" title={"Total Income"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {total_income}
          </Text>{" "}
        </Card>
        <Card className="shadow-md" title={"Total Expense"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {total_expense}
          </Text>{" "}
        </Card>
        <Card className="shadow-md" title={"Saving Balance"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {saving_balance ?? "0.00"}
          </Text>{" "}
        </Card>
        <Card className="shadow-md" title={"Total Saving"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {total_saving}
          </Text>{" "}
        </Card>
        <Card className="shadow-md" title={"Total Withdraw"}>
          Rs.{" "}
          <Text className="text-xl font-bold" strong>
            {total_withdraw}
          </Text>{" "}
        </Card>
      </div>
    </>
  );
};

export default BalanceCards;
