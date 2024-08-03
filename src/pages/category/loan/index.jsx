import { Table, message } from "antd";

import CategorySetupForm from "../../../components/category/categorySetupForm";
import { useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";
import TitleHeader from "../../../components/common/header";
import LowerHeader from "../../../components/common/header/LowerHeader";
import {
  useDeleteLoanCategory,
  useGetLoanCategory,
} from "../services/loan/useLoanCategory";

const LoanCategory = () => {
  const { data, error, isLoading, refetch } = useGetLoanCategory();
  const deleteLoanCategory = useDeleteLoanCategory();
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
    deleteLoanCategory.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Loan category deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete loan category.");
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

  const loanCategoryColumn = [
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
          handleViewComponent={handleViewComponent}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
          record={record}
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
          type: "loan",
          method: "category",
          multi_method: "categories",
        }}
        handleCreateComponent={handleCreateComponent}
      />
      <LowerHeader
        handleSearch={handleSearch}
        handleCreateComponent={handleCreateComponent}
        textProp={{
          type: "loan",
          method: "category",
          plural_method: "categories",
        }}
      />
      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={error ? [] : filteredData ?? data?.data?.data}
        columns={loanCategoryColumn}
      />
      <CategorySetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type={"loan"}
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default LoanCategory;
