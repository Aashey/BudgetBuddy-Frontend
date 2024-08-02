import { Card, Col, Radio, Row } from "antd";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
const DashboardCharts = ({ incomeData, expenseData }) => {
  const [radioOption, setRadioOption] = useState("line");
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

  const income_expense_series = useMemo(
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

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: radioOption,
        toolbar: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
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
    }),
    [radioOption]
  );

  const onChangeRadio = ({ target: { value } }) => {
    setRadioOption(value);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            {/* <Radio.Group
              options={radioOptions}
              onChange={onChangeRadio}
              value={radioOption}
              optionType="button"
              buttonStyle="solid"
              className="flex justify-end items-end mb-4"
            /> */}
            <Chart
              options={chartOptions}
              series={income_expense_series}
              type="line"
              height={350}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Chart
              options={chartOptions}
              series={income_expense_series}
              type="bar"
              height={350}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardCharts;
