import {
  useDeleteExpenseCategory,
  useExpenseCategory,
} from "../services/useCategory";
import {
  Button,
  Space,
  Input,
  Tooltip,
  Table,
  Typography,
  Skeleton,
  message,
} from "antd";
import { HiPlus } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { CiExport } from "react-icons/ci";
import CategorySetupForm from "../../../components/category/categorySetupForm";
import { useState } from "react";

const ExpenseCategory = () => {
  const { data, error, isLoading, refetch } = useExpenseCategory();
  const deleteExpenseCategory = useDeleteExpenseCategory();
  const [filteredData, setFilteredData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedRecord, setSelectedRecord] = useState();

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
    const id = record.id;
    console.log(record.id);
    console.log(record.id);
    deleteExpenseCategory.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Expense category deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete expense category.");
        },
      }
    );
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

  const expenseCategoryColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 200,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex justify-evenly">
          <Tooltip title="View">
            <Button
              onClick={() => handleViewComponent(record)}
              type="none"
              className="bg-none text-gray-600 hover:text-green-600"
              icon={<IoIosEye size={22} />}
            ></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              onClick={() => handleEditComponent(record)}
              type="none"
              className="bg-none text-gray-600 hover:text-blue-600"
              icon={<BiSolidEdit size={22} />}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              onClick={() => handleDelete(record)}
              type="none"
              className="bg-none text-gray-600 hover:text-red-600"
              icon={<AiFillDelete size={22} />}
            ></Button>
          </Tooltip>
        </div>
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
            <Typography.Title level={2}>Expense Category</Typography.Title>
            <Typography.Text className="text-gray-700">
              Manage all your expense categories or
              <Typography.Link> add a new category.</Typography.Link>
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
          Add Expense Category
        </Button>
        <Input.Search
          onChange={handleSearch}
          placeholder="Search Expense Categories"
        />
      </Space>
      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={error ? [] : filteredData ?? data?.data?.data}
        columns={expenseCategoryColumn}
      />
      <CategorySetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type={"expense"}
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default ExpenseCategory;
