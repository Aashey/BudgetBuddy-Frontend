import { HiPlus } from "react-icons/hi2";
import {
  useDeleteIncomeCategory,
  useIncomeCategory,
} from "../services/useCategory";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Typography,
  Skeleton,
  message,
} from "antd";
import { IoIosEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { CiExport } from "react-icons/ci";
import CategorySetupForm from "../../../components/category/categorySetupForm";
import { useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";

const IncomeCategory = () => {
  const { data, error, isLoading, refetch } = useIncomeCategory();
  const deleteIncomeCategory = useDeleteIncomeCategory();
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
    deleteIncomeCategory.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Income category deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete income category.");
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

  const incomeCategoryColumn = [
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
        <ActionGroup
          record={record}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
          handleViewComponent={handleViewComponent}
        />
      ),
      width: 200,
      align: "center",
    },
  ];

  return (
    <>
      <div className="bg-[#ededfa] text-white rounded-2xl shadow-sm p-4">
        <div className="flex justify-between align-center ">
          <span>
            <Typography.Title className="text-white" level={2}>
              Income Category
            </Typography.Title>
            <Typography.Text>
              Manage all your income categories or
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
          Add Income Category
        </Button>
        <Input.Search
          onChange={handleSearch}
          placeholder="Search Income Categories"
        />
      </Space>
      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={error ? [] : filteredData ?? data?.data?.data}
        columns={incomeCategoryColumn}
      />
      <CategorySetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type={"income"}
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default IncomeCategory;
