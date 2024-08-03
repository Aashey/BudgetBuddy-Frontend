import { Table, message } from "antd";

import CategorySetupForm from "../../../components/category/categorySetupForm";
import { useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";
import TitleHeader from "../../../components/common/header";
import LowerHeader from "../../../components/common/header/LowerHeader";
import {
  useDeleteExpenseCategory,
  useExpenseCategory,
} from "../services/expense/useExpenseCategory";

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
    setMode("update");
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
      width: 250,
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
          handleViewComponent={handleViewComponent}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
        />
      ),
      width: 250,
      align: "center",
    },
  ];

  return (
    <>
      <TitleHeader
        textProp={{
          type: "expense",
          method: "category",
          multi_method: "categories",
        }}
        handleCreateComponent={handleCreateComponent}
      />
      <LowerHeader
        handleSearch={handleSearch}
        handleCreateComponent={handleCreateComponent}
        textProp={{
          type: "expense",
          method: "category",
          plural_method: "categories",
        }}
      />
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
