import { HiPlus } from "react-icons/hi2";
import { useIncomeCategory } from "../services/useCategory";
import { Button, Card, Table, Typography } from "antd";
import CustomLayout from "../../../components/common/sider/Layout";

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
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
        <Typography.Title level={2}>Income Category</Typography.Title>
        <Button icon={<HiPlus size={20} />} className="mt-3" type="primary">
          Add Income Category
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={data?.data?.data}
        columns={incomeCategoryColumn}
      />
    </>
  );
};

export default IncomeCategory;
