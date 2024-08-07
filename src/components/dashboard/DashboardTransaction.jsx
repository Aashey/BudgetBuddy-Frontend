import { Table, Tag } from "antd";
import React, { useState } from "react";
import { useGetTransaction } from "../../pages/transaction/services/useTransactionHistory";
import { formatDate } from "../../helper/formatDate";

const DashboardTransaction = () => {
  const { data, error, isLoading } = useGetTransaction();

  const transactionColor = {
    income: "blue",
    expense: "red",
    saving: "yellow",
    withdraw: "green",
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
      width: 150,
    },
    {
      title: "Transaction",
      dataIndex: "transaction_type",
      key: "transaction_type",
      align: "center",
      width: 200,
      render: (transaction) => (
        <>
          <Tag color={transactionColor[transaction]}>{transaction}</Tag>
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
        className="custom-table ant-table-cell mt-5"
        rowKey="id"
        scroll={{ y: "45vh" }}
        pagination={false}
        onChange={handleTableChange}
        dataSource={error ? [] : data?.data}
        columns={TransactionHistoryColumn}
      />
    </div>
  );
};

export default DashboardTransaction;
