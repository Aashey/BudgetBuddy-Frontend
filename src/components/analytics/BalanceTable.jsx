import { Table } from "antd";
import React, { useState } from "react";

const BalanceTable = ({ tableData, error, isLoading }) => {
  const balanceColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 50,
      render: (text, record, index) => {
        const { current, pageSize } = tablePagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Opening Balance",
      dataIndex: "opening_balance",
      key: "opening_balance",
    },
    {
      title: "Closing Balance",
      dataIndex: "closing_balance",
      key: "closing_balance",
    },
    {
      title: "Total Income",
      dataIndex: "total_income",
      key: "total_income",
    },
    {
      title: "Total Expense",
      dataIndex: "total_expense",
      key: "total_expense",
    },
    {
      title: "Total Saving",
      dataIndex: "saving_balance",
      key: "saving_balance",
      render: (text) => (text === null ? "N/A" : text), // Render null values as 'N/A'
    },
    {
      title: "Total Withdraw",
      dataIndex: "total_withdraw",
      key: "total_withdraw",
    },
    {
      title: "Savings Balance",
      dataIndex: "total_saving",
      key: "total_saving",
    },
  ];
  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const handleTableChange = (pagination) => {
    setTablePagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  console.log("Table", tableData);
  return (
    <div className="custom-font p-4 mb-2">
      <Table
        rowKey="id"
        columns={balanceColumn}
        dataSource={!error ? tableData : []}
        loading={isLoading}
        className="custom-table ant-table-cell rounded-md "
        pagination={{
          current: tablePagination.current,
          pageSize: tablePagination.pageSize,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default BalanceTable;
