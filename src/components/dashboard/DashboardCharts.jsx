import { Card, Col, Radio, Row } from "antd";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
const DashboardCharts = ({ chartProp }) => {
  const [incomeExpenseRadioOption, setincomeExpenseRadioOption] =
    useState("line");
  const [savingWithdrawRadioOption, setsavingWithdrawRadioOption] =
    useState("line");
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
        data: chartProp[0],
      },
      {
        name: "Expenses",
        data: chartProp[1],
      },
    ],
    [chartProp]
  );
  const savingWithdrawSeries = useMemo(
    () => [
      {
        name: "Saving",
        data: chartProp[3],
      },
      {
        name: "Withdraw",
        data: chartProp[4],
      },
    ],
    [chartProp]
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
      },
      title: {
        text: "Income vs Expenses",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.4,
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
  const savingWithdrawChartOptions = useMemo(
    () => ({
      chart: {
        type: savingWithdrawRadioOption,
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Savings vs Withdraws",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.4,
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
    [savingWithdrawRadioOption]
  );

  const onChangeIncomeExpenseRadio = ({ target: { value } }) => {
    setincomeExpenseRadioOption(value);
  };

  const onChangeSavingWithdrawRadio = ({ target: { value } }) => {
    setsavingWithdrawRadioOption(value);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Radio.Group
              options={radioOptions}
              onChange={onChangeIncomeExpenseRadio}
              value={incomeExpenseRadioOption}
              optionType="button"
              buttonStyle="solid"
              className="flex justify-end items-end mb-4"
            />
            <Chart
              options={incomeExpenseChartOptions}
              series={incomeExpenseSeries}
              type={incomeExpenseRadioOption}
              height={350}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Radio.Group
              options={radioOptions}
              onChange={onChangeSavingWithdrawRadio}
              value={savingWithdrawRadioOption}
              optionType="button"
              buttonStyle="solid"
              className="flex justify-end items-end mb-4"
            />
            <Chart
              options={savingWithdrawChartOptions}
              series={savingWithdrawSeries}
              type={savingWithdrawRadioOption}
              height={350}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardCharts;
