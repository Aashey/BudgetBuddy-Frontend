import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";

import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";
import dayjs from "dayjs";
import useCategoryData from "../../hooks/category/useCategoryData";
import { customMutation } from "../../services/customMutation";
import {
  useCreateIncomeTransaction,
  useUpdateIncomeTransaction,
} from "../../pages/transaction/services/income/useIncomeTransaction";
import {
  useCreateWithdrawTransaction,
  useUpdateWithdrawTransaction,
} from "../../pages/transaction/services/withdraw/useWithdrawTransaction";
import {
  useCreateSavingTransaction,
  useUpdateSavingTransaction,
} from "../../pages/transaction/services/saving/useSavingTransaction";
import {
  useCreateExpenseTransaction,
  useUpdateExpenseTransaction,
} from "../../pages/transaction/services/expense/useExpenseTransaction";
// import FormDebug from "../../helper/FormDebug";
import { useGetTotalData } from "../../pages/dashboard/services/useTotalData";
import { disableAfterToday_AndPrevMonth } from "../../helper/disableDates";

const TransactionSetupForm = ({
  isDrawerOpen,
  onClose,
  type,
  refetch,
  mode,
  record = {},
}) => {
  const [form] = Form.useForm();
  const { Text } = Typography;
  const { data: totalData, refetch: refetchTotalData } = useGetTotalData();
  const createIncomeTransaction = useCreateIncomeTransaction();
  const createExpenseTransaction = useCreateExpenseTransaction();
  const createSavingTransaction = useCreateSavingTransaction();
  const createWithdrawTransaction = useCreateWithdrawTransaction();
  const updateIncomeTransaction = useUpdateIncomeTransaction();
  const updateExpenseTransaction = useUpdateExpenseTransaction();
  const updateSavingTransaction = useUpdateSavingTransaction();
  const updateWithdrawTransaction = useUpdateWithdrawTransaction();

  const { data, error, isLoading } = useCategoryData("category", type);

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (error && (type === "income" || type === "expense")) {
      message.error("Failed to load categories!");
    }
    const updatedData = data?.data?.data?.map((data) => ({
      value: data.id,
      label: data.title,
    }));
    setCategoryData(updatedData);
  }, [data, error]);

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    message.success(`Transaction ${action} successfully!`);
    refetch();
    refetchTotalData();
    onClose();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} transaction!`);
  };

  const OnFinish = (values) => {
    const transactionMap = {
      income: {
        create: createIncomeTransaction,
        update: updateIncomeTransaction,
      },
      expense: {
        create: createExpenseTransaction,
        update: updateExpenseTransaction,
      },
      saving: {
        create: createSavingTransaction,
        update: updateSavingTransaction,
      },
      withdraw: {
        create: createWithdrawTransaction,
        update: updateWithdrawTransaction,
      },
    };

    const dataKeys = {
      income: "date_received",
      expense: "date_spent",
    };

    const currentTransaction = transactionMap[type][mode];
    const dataKey = dataKeys[type] || null;

    const reformattedDate =
      values.date == (undefined || null)
        ? null
        : dayjs(values.date).format("YYYY-MM-DD");

    const reformattedValues = {
      ...values,
      is_recurring:
        values.is_recurring === undefined ? false : values.is_recurring,
    };
    delete reformattedValues.date;

    const createPayload = {
      income: {
        ...reformattedValues,
        [dataKey]: reformattedDate,
      },
      expense: {
        ...reformattedValues,
        [dataKey]: reformattedDate,
      },
      saving: values,
      withdraw: values,
    };

    const updatePayload = { ...createPayload[type], id: record.id };
    const payload = mode === "create" ? createPayload[type] : updatePayload;

    customMutation(
      currentTransaction,
      payload,
      handleMutationSuccess,
      handleMutationError
    );
  };

  useEffect(() => {
    if (mode == "update" || mode == "view") {
      form.setFieldsValue({
        ...record,
        date:
          type === "income"
            ? dayjs(record.date_received)
            : dayjs(record.date_spent),
      });
    } else {
      form.resetFields();
    }
  }, [mode, record, form]);

  return (
    <>
      <Drawer
        title={`${capitalizeInitialChar(type)} Transaction`}
        width="40vw"
        open={isDrawerOpen}
        onClose={onClose}
      >
        <Form
          disabled={mode === "view"}
          layout="vertical"
          onFinish={OnFinish}
          form={form}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 p-4 rounded-xl bg-[#ededfa]">
              <Text>
                {type === "withdraw" ? (
                  <>
                    Total Saving:{" "}
                    <span className="font-bold">
                      {
                        totalData?.data?.data?.financial_data?.current_month
                          ?.total_saving
                      }
                    </span>
                  </>
                ) : (
                  <>
                    Total Balance:{" "}
                    <span className="font-bold">
                      {
                        totalData?.data?.data?.financial_data?.current_month
                          ?.balance
                      }
                    </span>
                  </>
                )}
              </Text>
              <Button
                onClick={() => form.resetFields()}
                type="none"
                className="bg-gray-600  hover:bg-gray-800 text-white"
                icon={<GrClearOption />}
              >
                Clear
              </Button>
            </div>

            {(type === "income" || type === "expense") && (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<Text strong>Category</Text>}
                      name="category_id"
                      rules={[
                        { required: true, message: "This field is required." },
                      ]}
                    >
                      <Select
                        showSearch
                        loading={isLoading}
                        style={{ width: "100%", color: "black" }}
                        placeholder="Select a category"
                        options={categoryData}
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={<Text strong>Date</Text>}
                      name="date"
                      rules={[
                        {
                          required: mode === "update",
                          message: "This field is required.",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%", color: "black" }}
                        disabledDate={disableAfterToday_AndPrevMonth}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="amount"
                  label={<Text strong>Amount</Text>}
                  rules={[
                    { required: true, message: "This field is required." },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={10000000}
                    addonBefore="Rs."
                    style={{ width: "100%", color: "black" }}
                    placeholder="Enter amount"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="notes" label={<Text strong>Notes</Text>}>
                  <Input
                    style={{ width: "100%", color: "black" }}
                    placeholder="Enter Notes"
                  />
                </Form.Item>
              </Col>
            </Row>

            {(type === "income" || type === "expense") && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={<Text strong>Is Recurring</Text>}
                    name="is_recurring"
                  >
                    <Switch size="small" />
                  </Form.Item>
                </Col>
              </Row>
            )}

            {mode !== "view" && (
              <Form.Item>
                <Button
                  className="w-[12rem] m-auto"
                  type="primary"
                  htmlType="submit"
                >
                  {mode === "update" ? "Update" : "Add"}
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default TransactionSetupForm;
