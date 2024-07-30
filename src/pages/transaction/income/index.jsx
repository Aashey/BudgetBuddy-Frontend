import {
  Button,
  Input,
  message,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { CiExport } from "react-icons/ci";
import { HiPlus } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { useIncomeTransaction } from "../services/useTransaction";
import ActionGroup from "../../../components/common/actiongroup";
import TransactionSetupForm from "../../../components/transaction/TransactionSetupForm";

const IncomeTransaction = () => {
  const { data, error, isLoading, refetch } = useIncomeTransaction();
  const [filteredData, setFilteredData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedRecord, setSelectedRecord] = useState();

  console.log("data", data);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value?.toLowerCase();
    if (!searchValue) {
      setFilteredData(null);
      return;
    }
    const filterData = data?.data?.data.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filterData);
  };

  const handleDelete = (record) => {
    // const id = record.id;
    // console.log(record.id);
    // deleteIncomeCategory.mutate(
    //   { id },
    //   {
    //     onSuccess: () => {
    //       message.success("Income category deleted successfully! ");
    //       refetch();
    //     },
    //     onError: () => {
    //       message.error("Failed to delete income category.");
    //     },
    //   }
    // );
  };
  const handleCreateComponent = () => {
    openDrawer();
    setMode("create");
  };
  const handleViewComponent = (record) => {
    openDrawer();
    setMode("view");
    setSelectedRecord(record);
  };
  const handleEditComponent = (record) => {
    openDrawer();
    setMode("edit");
    setSelectedRecord(record);
  };

  const incomeTransactionColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category_title",
      key: "category_title",
      width: 400,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Recurring",
      dataIndex: "is_recurring",
      key: "is_recurring",
      align: "center",
      render: (isRecurring) => <Switch size="small" value={isRecurring} />,
    },
    {
      title: "Action",
      render: (record) => (
        <ActionGroup
          record={record}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
          handleViewComponent={handleViewComponent}
        />
      ),
      width: 250,
      align: "center",
    },
  ];

  return (
    <>
      <div className="bg-[#ededfa] text-white rounded-2xl shadow-sm p-4">
        <div className="flex justify-between align-center ">
          <span>
            <Typography.Title className="text-white" level={2}>
              Income Transaction
            </Typography.Title>
            <Typography.Text>
              Manage all your income transactions or
              <Typography.Link> add a new transaction.</Typography.Link>
            </Typography.Text>
          </span>
          <Button className="bg-white p-5 mt-4" icon={<CiExport size={18} />}>
            Export
          </Button>
        </div>
      </div>
      <Space className="mt-5 mb-3 flex justify-between">
        <Button
          onClick={handleCreateComponent}
          icon={<HiPlus size={20} />}
          type="primary"
        >
          Add Income Transaction
        </Button>
        <Input.Search
          onChange={handleSearch}
          placeholder="Search Income Transactions"
        />
      </Space>
      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={error ? [] : filteredData ?? data?.data?.data}
        columns={incomeTransactionColumn}
      />
      <TransactionSetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type="income"
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default IncomeTransaction;
