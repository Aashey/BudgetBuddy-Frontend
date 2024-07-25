import { useExpenseCategory } from "../services/useCategory";
import { Button, Card, Space, Input, Tooltip, Table, Typography } from "antd";
import { HiPlus } from "react-icons/hi2";
import CustomLayout from "../../../components/common/sider/Layout";
import { IoIosCloudDownload, IoIosEye } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";

const ExpenseCategory = () => {
  const { data, error, isLoading } = useExpenseCategory();
  console.log(data?.data?.data);

  const expenseCategoryColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: () => (
        <div className="flex justify-evenly">
          <Tooltip title="View">
            <Button icon={<IoIosEye size={22} />}></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<BiSolidEdit size={22} />}></Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<AiFillDelete size={22} />}></Button>
          </Tooltip>
        </div>
      ),
      width: 200,
      align: "center",
    },
  ];

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }

  return (
    <>
      <div className="flex justify-between align-center">
        <span>
          <Typography.Title level={2}>Expense Category</Typography.Title>
          <Typography.Text className="text-gray-700">
            Manage all your expense categories or add a new category.
          </Typography.Text>
        </span>
        <Button
          className="bg-transparent p-4 rounded-xl"
          icon={<IoIosCloudDownload size={18} />}
        >
          Export
        </Button>
      </div>

      <Space className="mt-8 flex justify-between">
        <Input.Search placeholder="Search Expense Categories" />
        <Button icon={<HiPlus size={20} />} className="p-4" type="primary">
          Add Expense Category
        </Button>
      </Space>
      <Table
        className="mt-8"
        rowKey="id"
        dataSource={data?.data?.data}
        columns={expenseCategoryColumn}
      />
    </>
  );
};

export default ExpenseCategory;
