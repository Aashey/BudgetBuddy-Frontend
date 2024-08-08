import { Card, Col, Radio, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
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
        width: 2,
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.2,
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

      colors: ["#16A34A", "#EF4444"],
    }),
    [incomeExpenseRadioOption]
  );
  const totalIncomeExpenseOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
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
      colors: ["#4CAF50", "#F44336"],
      labels: ["Total Income", "Total Expense"],
    }),
    [incomeTotal, expenseTotal]
  );

  console.log("Total income: ", incomeTotal);
  console.log("Total expense: ", expenseTotal);

  const totalIncomeExpenseSeries = useMemo(
    () => [Number(incomeTotal), Number(expenseTotal)],
    [incomeTotal, expenseTotal]
  );

  const onChangeIncomeExpenseRadio = ({ target: { value } }) => {
    setincomeExpenseRadioOption(value);
  };

  return (
    <>
      <div className="flex flex-wrap justify-evenly w-full">
        <Card className="w-[35rem] h-[25rem] p-0 bg-white  ">
          <div className="flex justify-between flex-wrap">
            <Title level={5}>Income vs Expense</Title>

            <Radio.Group
              options={radioOptions}
              onChange={onChangeIncomeExpenseRadio}
              value={incomeExpenseRadioOption}
              optionType="button"
              buttonStyle="solid"
              className="flex justify-end items-end mb-4"
            />
          </div>
          <Chart
            options={incomeExpenseChartOptions}
            series={incomeExpenseSeries}
            type={incomeExpenseRadioOption}
            height={300}
          />
        </Card>
        <Card className="w-[35rem] h-[25rem] p-0 bg-white">
          <Title level={5}>Total Income vs Total Expense</Title>
          <Chart
            options={totalIncomeExpenseOptions}
            series={totalIncomeExpenseSeries}
            type="donut"
            height={300}
          />
        </Card>
      </div>
    </>
  );
};

export default DashboardCharts;
