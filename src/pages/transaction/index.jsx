import { Button, Input, message, Switch, Table, Tag, Typography } from "antd";
import { useState } from "react";
import TitleHeader from "../../components/common/header";
import LowerHeader from "../../components/common/header/LowerHeader";
import { formatDate } from "../../helper/formatDate";
import { useGetTransaction } from "./services/useTransactionHistory";
import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";
import { CiExport } from "react-icons/ci";

const TransactionHistory = () => {
  const { data, error, isLoading } = useGetTransaction();
  console.log(data?.data);
  const [filteredData, setFilteredData] = useState(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value?.toLowerCase();
    if (!searchValue) {
      setFilteredData(null);
      return;
    }
    const filterData = data?.data?.filter((item) =>
      item.transaction_type.toLowerCase().includes(searchValue)
    );
    setFilteredData(filterData);
  };

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const transactionColor = {
    Income: "blue",
    Expense: "red",
    Saving: "yellow",
    Withdraw: "green",
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
            color={transactionColor[transaction]}
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

  const handleTableChange = (pagination) => {
    setTablePagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <>
      <div className="bg-[#ededfa] text-white rounded-2xl shadow-sm p-4">
        <div className="flex justify-between align-center ">
          <span>
            <Typography.Title className="text-white" level={3}>
              Transaction History
            </Typography.Title>
            <Typography.Text className="custom-font">
              View all your transactions here.
            </Typography.Text>
          </span>
          <Button
            className="custom-font bg-white p-2 mt-4"
            icon={<CiExport size={16} />}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="flex justify-start w-[15vw] mt-5">
        <Input.Search
          addonBefore="Search"
          onChange={handleSearch}
          placeholder="transactions"
        />
      </div>

      <Table
        loading={isLoading}
        className="custom-table ant-table-cell mt-5"
        rowKey="id"
        scroll={{ y: "45vh" }}
        pagination={{
          current: tablePagination.current,
          pageSize: tablePagination.pageSize,
        }}
        onChange={handleTableChange}
        dataSource={error ? [] : filteredData ?? data?.data}
        columns={TransactionHistoryColumn}
      />
    </>
  );
};

export default TransactionHistory;
