import { Button, DatePicker, Input, Switch, Table, message } from "antd";

import CategorySetupForm from "../../../components/category/categorySetupForm";
import { useEffect, useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";
import LowerHeader from "../../../components/common/header/LowerHeader";
import {
  useDeleteIncomeCategory,
  useIncomeCategory,
} from "../services/income/useIncomeCategory";
import TitleHeader from "../../../components/common/header/test";
import { CiSearch } from "react-icons/ci";
import DateFilter from "../../../components/common/filter";
import dayjs from "dayjs";

const IncomeCategory = () => {
  const [queryParam, setQueryParam] = useState("");
  const { data, error, isLoading, refetch } = useIncomeCategory(queryParam);
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

  const getQueryParam = (data) => {
    setQueryParam(data);
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
          message.success("Category deleted successfully!");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete category!");
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
  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const incomeCategoryColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 50,
      render: (text, record, index) => {
        const { current, pageSize } = tablePagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (isActive) => <Switch size="small" value={isActive} />,
      width: 100,
    },
    {
      title: "Action",
      render: (record) => (
        <ActionGroup
          record={record}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
          handleViewComponent={handleViewComponent}
          method="category"
        />
      ),
      width: 100,
      align: "center",
    },
  ];

  const handleTableChange = (pagination) => {
    setTablePagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <>
      <TitleHeader handleCreateComponent={handleCreateComponent}>
        INCOME CATEGORY
      </TitleHeader>

      <div className="p-4">
        <LowerHeader
          handleSearch={handleSearch}
          handleCreateComponent={handleCreateComponent}
          refetch={refetch}
          getQueryParam={getQueryParam}
        />

        <Table
          loading={isLoading}
          className="custom-table ant-table-cell rounded-md "
          rowKey="id"
          pagination={{
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
          }}
          onChange={handleTableChange}
          dataSource={error ? [] : filteredData ?? data?.data?.data}
          columns={incomeCategoryColumn}
        />
      </div>

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
