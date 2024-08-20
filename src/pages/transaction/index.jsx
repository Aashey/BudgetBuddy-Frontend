import {
  Button,
  DatePicker,
  Input,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { formatDate } from "../../helper/formatDate";
import { useGetTransaction } from "./services/useTransactionHistory";
import { CiSearch } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";
import DateFilter from "../../components/common/filter";
import dayjs from "dayjs";
import { MdPreview } from "react-icons/md";

const TransactionHistory = () => {
  const [queryParam, setQueryParam] = useState("");
  const { data, error, isLoading, refetch } = useGetTransaction(queryParam);
  const [filteredData, setFilteredData] = useState(null);
  console.log("assd", data);
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
              color: "white",
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

  const handleTableChange = (pagination) => {
    setTablePagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const { RangePicker } = DatePicker;

  const [filterType, setFilterType] = useState();
  const [dateRange, setDateRange] = useState();

  const filterState = (data) => {
    setFilterType(data);
  };

  const handleFilter = () => {
    if (filterType === "period") {
      setQueryParam(`from_date=${dateRange[0]}&to_date=${dateRange[1]}`);
    } else if (filterType === "this_week") {
      setQueryParam(`from_date=${dateRange[0]}&to_date=${dateRange[1]}`);
    } else {
      setQueryParam(`from_date=${dateRange[0]}&to_date=${dateRange[1]}`);
    }
  };

  return (
    <>
      <div className="bg-[#EDEDFA] p-4">
        <div className="flex justify-between align-center ">
          <span>
            <Typography.Title className="text-white" level={3}>
              TRANSACTION HISTORY
            </Typography.Title>
            <Typography.Text className="custom-font">
              View all your transactions here
            </Typography.Text>
          </span>
        </div>
      </div>

      <div className="p-4">
        <Space className="mb-4 flex justify-between">
          <span className="flex justify-start gap-2">
            <Input
              className="min-w-[200] max-w-[200]"
              prefix={<CiSearch size={14} />}
              onChange={handleSearch}
              placeholder="Search"
            />
            <DateFilter filterState={filterState} />
            {filterType === "period" && (
              <RangePicker
                onChange={(value) => {
                  const formattedDates = value.map((date) =>
                    dayjs(date).format("YYYY-MM-DD")
                  );
                  setDateRange(formattedDates);
                }}
                className="w-full"
              />
            )}
            <Button
              type="none"
              icon={<MdPreview size={22} />}
              onClick={handleFilter}
              className="bg-emerald-600 text-white hover:bg-emerald-800"
            >
              Preview
            </Button>
          </span>

          <Tooltip title="Export to excel">
            <Button
              className="custom-font bg-white"
              icon={<FaRegFileExcel size={16} />}
            >
              Excel
            </Button>
          </Tooltip>
        </Space>

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
