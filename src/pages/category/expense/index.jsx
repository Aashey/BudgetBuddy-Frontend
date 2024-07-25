import { useExpenseCategory } from "../services/useCategory";
import { Button, Card, Table, Typography } from "antd";
import { HiPlus } from "react-icons/hi2";
import CustomLayout from "../../../components/common/sider/Layout";
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
        <Typography.Title level={2}>Expense Category</Typography.Title>
        <Button icon={<HiPlus size={20} />} className="mt-3" type="primary">
          Add Expense Category
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data?.data?.data}
        columns={expenseCategoryColumn}
      />
    </>
  );
};

export default ExpenseCategory;
