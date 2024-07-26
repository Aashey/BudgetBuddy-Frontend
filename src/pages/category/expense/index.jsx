import { useExpenseCategory } from "../services/useCategory";
import {
  Button,
  Space,
  Input,
  Tooltip,
  Table,
  Typography,
  Skeleton,
} from "antd";
import { HiPlus } from "react-icons/hi2";
import { IoIosCloudDownload, IoIosEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { CiExport } from "react-icons/ci";

const ExpenseCategory = () => {
  const { data, error, isLoading } = useExpenseCategory();
  console.log(data?.data?.data);

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
      render: () => (
        <div className="flex justify-evenly">
          <Tooltip title="View">
            <Button
              type="none"
              className="bg-none text-gray-600 hover:text-green-600"
              icon={<IoIosEye size={22} />}
            ></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="none"
              className="bg-none text-gray-600 hover:text-blue-600"
              icon={<BiSolidEdit size={22} />}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
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

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <h2>Unable to get Expense Category</h2>;
  }

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
          <Button
            className="bg-transparent text-black p-5 mt-4"
            icon={<CiExport size={18} />}
          >
            Export
          </Button>
        </div>
      </div>
      <Space className="mt-5 mb-3 flex justify-between">
        <Button icon={<HiPlus size={20} />} type="primary">
          Add Expense Category
        </Button>
        <Input.Search placeholder="Search Expense Categories" />
      </Space>
      <Table
        className="mt-5"
        rowKey="id"
        dataSource={data?.data?.data}
        columns={expenseCategoryColumn}
      />
    </>
  );
};

export default ExpenseCategory;
