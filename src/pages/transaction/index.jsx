import { Input, Table, Tag, Typography } from "antd";
import { useState } from "react";
import { formatDate } from "../../helper/formatDate";
import { useGetTransaction } from "./services/useTransactionHistory";
import { CiSearch } from "react-icons/ci";

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
      <div className="bg-[#EDEDFA] p-4">
        <div className="flex justify-between align-center ">
          <span>
            <Typography.Title className="text-white" level={3}>
              Transaction History
            </Typography.Title>
            <Typography.Text className="custom-font">
              View all your transactions here.
            </Typography.Text>
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-start w-[15vw] mt-2 mb-5">
          <Input
            prefix={<CiSearch size={14} />}
            onChange={handleSearch}
            placeholder="Search"
          />
        </div>
        <Table
          loading={isLoading}
          className="custom-table ant-table-cell"
          rowKey="id"
          pagination={{
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
          }}
          onChange={handleTableChange}
          dataSource={error ? [] : filteredData ?? data?.data}
          columns={TransactionHistoryColumn}
        />
      </div>
    </>
  );
};

export default TransactionHistory;
