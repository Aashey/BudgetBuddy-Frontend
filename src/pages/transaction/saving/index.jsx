import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import ActionGroup from "../../../components/common/actiongroup";
import TransactionSetupForm from "../../../components/transaction/TransactionSetupForm";
import TitleHeader from "../../../components/common/header";
import LowerHeader from "../../../components/common/header/LowerHeader";

import {
  useCreateSavingGoal,
  useDeleteSavingGoal,
  useDeleteSavingTransaction,
  useGetSavingGoal,
  useSavingTransaction,
} from "../services/saving/useSavingTransaction";
import { formatDate } from "../../../helper/formatDate";
import { Typography } from "antd";
import Inputs from "../../../components/common/ui/input/CustomInput";

import { MdDeleteForever } from "react-icons/md";

const SavingTransaction = () => {
  const [form] = Form.useForm();
  const { data, error, isLoading, refetch } = useSavingTransaction();
  const [filteredData, setFilteredData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedRecord, setSelectedRecord] = useState();
  const deleteSavingTransaction = useDeleteSavingTransaction();
  const createSavingGoal = useCreateSavingGoal();
  const deleteSavingGoal = useDeleteSavingGoal();
  const {
    data: goalData,
    error: goalError,
    isLoading: goalIsLoading,
    refetch: goalRefetch,
  } = useGetSavingGoal();

  const { Title, Text } = Typography;

  console.log("Goal Data", goalData);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
          message.success("Transaction deleted successfully!");
          refetch();
        },
        onError: () => {
          message.error("Failed to delete transaction!");
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

  const SavingTransactionColumn = [
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
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return formatDate(date);
      },
      width: 150,
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

  const saveGoalData = () => {
    createSavingGoal.mutate(
      { target_amount: form.getFieldsValue().target_amount },
      {
        onSuccess: () => {
          message.success("Saving goal added Successfully!");
          refetch();
          setIsModalOpen(false);
        },
        onError: () => {
          message.error("Failed to add saving goal!");
        },
      }
    );
  };

  useEffect(() => {
    if (goalData?.data?.data.length != 0) {
      form.setFieldsValue({
        target_amount: goalData?.data?.data[0].target_amount,
      });
    } else {
      form.resetFields();
    }
  }, [goalData, form, refetch]);

  return (
    <>
      <TitleHeader
        goalData={goalData?.data?.data}
        openModal={openModal}
        textProp={{
          type: "saving",
          method: "transaction",
          plural_method: "transactions",
        }}
        handleCreateComponent={handleCreateComponent}
      />

      <Modal
        title="Saving Goal"
        open={isModalOpen}
        onClose={closeModal}
        onCancel={closeModal}
        footer={
          <>
            {goalData?.data?.data.length > 0 ? (
              <>
                <Button
                  icon={<MdDeleteForever size={20} />}
                  type="none"
                  onClick={() => {
                    deleteSavingGoal.mutate(goalData?.data?.data[0].id, {
                      onSuccess: () => {
                        message.success("Saving goal deleted successfully!");
                        setIsModalOpen(false);
                        refetch();
                      },
                      onError: () => {
                        message.error("Failed to delete saving goal.");
                        setIsModalOpen(false);
                      },
                    });
                  }}
                  className="bg-red-600 text-white hover:bg-red-800"
                >
                  Delete Goal
                </Button>
              </>
            ) : (
              <Form.Item>
                <Button onClick={saveGoalData} type="primary">
                  Add Goal
                </Button>
              </Form.Item>
            )}
          </>
        }
      >
        <Form
          form={form}
          disabled={goalData?.data?.data.length > 0}
          layout="vertical"
          onFinish={saveGoalData}
        >
          <Divider />
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="target_amount"
                label="Target"
                rules={[
                  { required: true, message: "This field is required  " },
                ]}
              >
                <Input style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div className="p-4">
        <LowerHeader
          handleSearch={handleSearch}
          handleCreateComponent={handleCreateComponent}
          textProp={{
            type: "saving",
            plural_method: "transactions",
          }}
        />
        <Table
          loading={isLoading}
          className="custom-table ant-table-cell mt-5"
          rowKey="id"
          pagination={{
            current: tablePagination.current,
            pageSize: tablePagination.pageSize,
          }}
          onChange={handleTableChange}
          dataSource={error ? [] : filteredData ?? data?.data?.data}
          columns={SavingTransactionColumn}
        />
      </div>

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
