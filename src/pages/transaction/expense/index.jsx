import { message, Switch, Table } from "antd";
import { useState } from "react";

import ActionGroup from "../../../components/common/actiongroup";
import TransactionSetupForm from "../../../components/transaction/TransactionSetupForm";
import TitleHeader from "../../../components/common/header";
import LowerHeader from "../../../components/common/header/LowerHeader";
import {
  useDeleteExpenseTransaction,
  useExpenseTransaction,
} from "../services/expense/useExpenseTransaction";
import { formatDate } from "../../../helper/formatDate";

const ExpenseTransaction = () => {
  const { data, error, isLoading, refetch } = useExpenseTransaction();
  const deleteExpenseTransaction = useDeleteExpenseTransaction();
  const [mode, setMode] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
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
      item.category_title.toLowerCase().includes(searchValue)
    );
    setFilteredData(filterData);
  };

  const handleDelete = (record) => {
    const id = record.id;
    console.log(record.id);
    deleteExpenseTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Expense transaction deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete Expense transaction.");
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

  const ExpenseTransactionColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 80,
      render: (text, record, index) => {
        const { current, pageSize } = tablePagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Date",
      dataIndex: "date_spent",
      key: "date_spent",
      render: (date) => {
        return formatDate(date);
      },
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category_title",
      key: "category_title",
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 150,
    },
    {
      title: "Recurring",
      dataIndex: "is_recurring",
      key: "is_recurring",
      align: "center",
      render: (isRecurring) => <Switch size="small" value={isRecurring} />,
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
        />
      ),
      width: 150,
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
      <TitleHeader
        textProp={{
          type: "expense",
          method: "transaction",
          multi_method: "transactions",
        }}
        handleCreateComponent={handleCreateComponent}
      />
      <div className="p-4">
        <LowerHeader
          handleSearch={handleSearch}
          handleCreateComponent={handleCreateComponent}
          textProp={{
            type: "expense",
            plural_method: "transactions",
          }}
        />
        <Table
          loading={isLoading}
          className="custom-table ant-table-cell mt-5"
          rowKey="id"
          scroll={{ y: "45vh" }}
          pagination={{
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
          }}
          onChange={handleTableChange}
          dataSource={error ? [] : filteredData ?? data?.data?.data}
          columns={ExpenseTransactionColumn}
        />
      </div>
      <TransactionSetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type="expense"
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default ExpenseTransaction;
