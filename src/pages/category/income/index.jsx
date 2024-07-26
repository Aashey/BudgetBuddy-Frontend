import { HiPlus } from "react-icons/hi2";
import { useIncomeCategory } from "../services/useCategory";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Typography,
  Skeleton,
} from "antd";
import { IoIosCloudDownload, IoIosEye } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { CiExport } from "react-icons/ci";

const IncomeCategory = () => {
  const { data, error, isLoading } = useIncomeCategory();
  console.log(data?.data?.data);

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
    return <h2>Unable to get Income Category</h2>;
  }

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
          <Button
            className="bg-transparent p-5 mt-4 rounded-xl"
            icon={<CiExport size={18} />}
          >
            Export
          </Button>
        </div>
      </div>
      <Space className="mt-5 mb-3 flex justify-between">
        <Button icon={<HiPlus size={20} />} type="primary">
          Add Income Category
        </Button>
        <Input.Search placeholder="Search Income Categories" />
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
