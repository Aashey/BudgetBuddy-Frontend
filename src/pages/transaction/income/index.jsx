import { message, Switch, Table } from "antd";
import { useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";
import TransactionSetupForm from "../../../components/transaction/TransactionSetupForm";
import TitleHeader from "../../../components/common/header";
import LowerHeader from "../../../components/common/header/LowerHeader";
import {
  useDeleteIncomeTransaction,
  useIncomeTransaction,
} from "../services/income/useIncomeTransaction";

const IncomeTransaction = () => {
  const { data, error, isLoading, refetch } = useIncomeTransaction();
  const [filteredData, setFilteredData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedRecord, setSelectedRecord] = useState();
  const deleteIncomeTransaction = useDeleteIncomeTransaction();

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
    deleteIncomeTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Income transaction deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete income transaction.");
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

  const incomeTransactionColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 100,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date Received",
      dataIndex: "date_received",
      key: "date_received",
      width: 200,
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
      width: 200,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 200,
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
      width: 250,
      align: "center",
    },
  ];

  return (
    <>
      <TitleHeader
        textProp={{
          type: "income",
          method: "transaction",
          multi_method: "transactions",
        }}
        handleCreateComponent={handleCreateComponent}
      />

      <LowerHeader
        handleSearch={handleSearch}
        handleCreateComponent={handleCreateComponent}
        textProp={{
          type: "income",
          method: "transaction",
          plural_method: "transactions",
        }}
      />

      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={error ? [] : filteredData ?? data?.data?.data}
        columns={incomeTransactionColumn}
      />

      <TransactionSetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type="income"
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default IncomeTransaction;
