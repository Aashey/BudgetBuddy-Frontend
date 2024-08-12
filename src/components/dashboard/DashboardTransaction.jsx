import { Table, Tag } from "antd";
import React, { useState } from "react";
import { useGetTransaction } from "../../pages/transaction/services/useTransactionHistory";
import { formatDate } from "../../helper/formatDate";

const DashboardTransaction = () => {
  const { data, error, isLoading } = useGetTransaction();

  const transactionColor = {
    Income: "#16A34A",
    Expense: "#EF4444",
    Saving: "#D97706",
    Withdraw: "#087CAF",
  };

  const TransactionHistoryColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 80,
      render: (text, record, index) => {
        const { current, pageSize } = tablePagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => {
        return formatDate(date);
      },
      width: 100,
    },
    {
      title: "Transaction",
      dataIndex: "transaction_type",
      key: "transaction_type",
      align: "center",
      width: 300,
      render: (transaction) => (
        <>
          <Tag
            className="w-[80px] text-center"
            style={{
              backgroundColor: `${transactionColor[transaction]}`,
              color: "White",
              border: "none",
            }}
          >
            {transaction}
          </Tag>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
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
  return (
    <div>
      <Table
        loading={isLoading}
        className="custom-table ant-table-cell"
        rowKey="id"
        // scroll={{ y: "45vh" }}
        pagination={false}
        onChange={handleTableChange}
        dataSource={error ? [] : data?.data.slice(0, 5)}
        columns={TransactionHistoryColumn}
      />
    </div>
  );
};

export default DashboardTransaction;
