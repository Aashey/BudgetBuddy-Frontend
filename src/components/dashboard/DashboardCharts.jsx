import { Card, Col, Divider, Radio, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { formatDate_WithMonth } from "../../helper/formatDate";
const DashboardCharts = ({
  incomeData,
  expenseData,
  savingData,
  withdrawData,
  totalData,
}) => {
  const [incomeExpenseRadioOption, setincomeExpenseRadioOption] =
    useState("line");

  const incomeTotal = totalData?.current_month?.total_income || 0;
  const expenseTotal = totalData?.current_month?.total_expense || 0;

  const radioOptions = [
    {
      label: "Line",
      value: "line",
    },
    {
      label: "Bar",
      value: "bar",
    },
  ];

  const incomeExpenseSeries = useMemo(
    () => [
      {
        name: "Income",
        data: incomeData,
      },
      {
        name: "Expenses",
        data: expenseData,
      },
    ],
    [incomeData, expenseData]
  );

  const incomeExpenseChartOptions = useMemo(
    () => ({
      chart: {
        type: incomeExpenseRadioOption,
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      markers: {
        size: 5,
      },
      grid: {
        show: true,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 0.5,
        strokeDashArray: 0,
        row: {
          colors: ["transparent", "transparent"],
        },
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      colors: ["#12CBC4", "#ED4C67"],
    }),
    [incomeExpenseRadioOption]
  );
  const totalIncomeExpenseOptions = useMemo(
    () => ({
      chart: {
        type: "pie",
        toolbar: false,
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
      colors: ["#12CBC4", "#ED4C67"],
      labels: ["Income", "Expense"],
    }),
    [incomeTotal, expenseTotal]
  );

  console.log("Income: ", incomeTotal);
  console.log("Expense: ", expenseTotal);

  const totalIncomeExpenseSeries = useMemo(
    () => [Number(incomeTotal), Number(expenseTotal)],
    [incomeTotal, expenseTotal]
  );

  const onChangeIncomeExpenseRadio = ({ target: { value } }) => {
    setincomeExpenseRadioOption(value);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between w-full">
        <Card
          title={
            <div className="flex justify-between flex-wrap">
              <Title level={5}>Income vs Expense</Title>
              <Radio.Group
                options={radioOptions}
                onChange={onChangeIncomeExpenseRadio}
                value={incomeExpenseRadioOption}
                optionType="button"
                buttonStyle="solid"
                className="flex justify-end items-end"
              />
            </div>
          }
          className="w-[73%] h-[25rem] p-0 bg-white shadow-md border-gray-200"
        >
          <Chart
            options={incomeExpenseChartOptions}
            series={incomeExpenseSeries}
            // type={incomeExpenseRadioOption}
            type={"area"}
            height={300}
          />
        </Card>
        <Card
          title={
            <Title level={5}>{formatDate_WithMonth(Date())}'s Summary</Title>
          }
          className="w-[26%] h-[25rem] p-0 bg-white shadow-md border-gray-200"
        >
          <Chart
            options={totalIncomeExpenseOptions}
            series={totalIncomeExpenseSeries}
            type="pie"
            height={300}
            className="w-full"
          />
        </Card>
      </div>
    </>
  );
};

export default DashboardCharts;
