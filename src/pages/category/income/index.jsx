import { HiPlus } from "react-icons/hi2";
import { useIncomeCategory } from "../services/useCategory";
import {
  Button,
  Card,
  Divider,
  Input,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { IoIosCloudDownload, IoIosEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";

const IncomeCategory = () => {
  const { data, error, isLoading } = useIncomeCategory();
  console.log(data?.data?.data);

  const incomeCategoryColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 500,
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
      <div className="flex justify-between align-center ">
        <span>
          <Typography.Title level={2}>Income Category</Typography.Title>
          <Typography.Text className="text-gray-700">
            Manage all your income categories or add a new category.
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
        <Input.Search placeholder="Search Income Categories" />
        <Button icon={<HiPlus size={20} />} className="p-4" type="primary">
          Add Income Category
        </Button>
      </Space>

      <Table
        className="mt-5"
        rowKey="id"
        dataSource={data?.data?.data}
        columns={incomeCategoryColumn}
      />
    </>
  );
};

export default IncomeCategory;
