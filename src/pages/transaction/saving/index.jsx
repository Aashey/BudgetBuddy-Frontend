import { message, Table } from "antd";
import { useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";
import TransactionSetupForm from "../../../components/transaction/TransactionSetupForm";
import TitleHeader from "../../../components/common/header";
import LowerHeader from "../../../components/common/header/LowerHeader";
import {
  useDeleteSavingTransaction,
  useSavingTransaction,
} from "../services/saving/useSavingTransaction";

const SavingTransaction = () => {
  const { data, error, isLoading, refetch } = useSavingTransaction();
  const [filteredData, setFilteredData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedRecord, setSelectedRecord] = useState();
  const deleteSavingTransaction = useDeleteSavingTransaction();

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
    deleteSavingTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          message.success("Saving transaction deleted successfully! ");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete saving transaction.");
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

  const SavingTransactionColumn = [
    {
      title: "S.N.",
      key: "sn",
      width: 100,
      render: (text, record, index) => index + 1,
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
      title: "Action",
      render: (record) => (
        <ActionGroup
          record={record}
          handleEditComponent={handleEditComponent}
          handleDelete={handleDelete}
          handleViewComponent={handleViewComponent}
        />
      ),
      width: 100,
      align: "center",
    },
  ];

  return (
    <>
      <TitleHeader
        textProp={{
          type: "saving",
          method: "transaction",
          multi_method: "transactions",
        }}
        handleCreateComponent={handleCreateComponent}
      />

      <LowerHeader
        handleSearch={handleSearch}
        handleCreateComponent={handleCreateComponent}
        textProp={{
          type: "saving",
          method: "transaction",
          plural_method: "transactions",
        }}
      />

      <Table
        loading={isLoading}
        className="mt-5"
        rowKey="id"
        dataSource={error ? [] : filteredData ?? data?.data?.data}
        columns={SavingTransactionColumn}
      />

      <TransactionSetupForm
        isDrawerOpen={isDrawerOpen}
        onClose={closeDrawer}
        type="saving"
        refetch={refetch}
        mode={mode}
        record={selectedRecord}
      />
    </>
  );
};

export default SavingTransaction;
