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
import FormDebug from "../../helper/FormDebug";

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
  const createIncomeTransaction = useCreateIncomeTransaction();
  const createExpenseTransaction = useCreateExpenseTransaction();
  const createSavingTransaction = useCreateSavingTransaction();
  const createWithdrawTransaction = useCreateWithdrawTransaction();
  const updateIncomeTransaction = useUpdateIncomeTransaction();
  const updateExpenseTransaction = useUpdateExpenseTransaction();
  const updateSavingTransaction = useUpdateSavingTransaction();
  const updateWithdrawTransaction = useUpdateWithdrawTransaction();

  const { data, error, isLoading } = useCategoryData(type);

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (error) {
      message.error("Failed to load categories.");
    }
    const updatedData = data?.data?.data?.map((data) => ({
      value: data.id,
      label: data.title,
    }));
    setCategoryData(updatedData);
  }, [data, error]);

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    message.success(
      `${capitalizeInitialChar(type)} transaction ${action} successfully.`
    );
    refetch();
    onClose();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} ${type} transaction.`);
  };

  const OnFinish = (values) => {
    console.log(values);

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

    console.log("reformatted date", reformattedDate);

    const reformattedValues = {
      ...values,
      is_recurring:
        values.is_recurring === undefined ? false : values.is_recurring,
    };
    delete reformattedValues.date;

    console.log("REformatted values", reformattedValues);

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
    console.log(updatePayload);
    const payload = mode === "create" ? createPayload[type] : updatePayload;

    console.log("Update payload", updatePayload);
    customMutation(
      currentTransaction,
      payload,
      handleMutationSuccess,
      handleMutationError
    );
  };

  useEffect(() => {
    if (mode == "update" || mode == "view") {
      console.log(categoryData);

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
        width={700}
        open={isDrawerOpen}
        onClose={onClose}
      >
        <Form
          disabled={mode === "view"}
          layout="vertical"
          className="p-6"
          onFinish={OnFinish}
          form={form}
        >
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
                      style={{ width: "100%" }}
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
                  <Form.Item label={<Text strong>Date</Text>} name="date">
                    <DatePicker style={{ width: "100%" }} />
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
                rules={[{ required: true, message: "This field is required." }]}
              >
                <InputNumber
                  min={1}
                  max={10000000}
                  addonBefore="Rs."
                  style={{ width: "100%" }}
                  placeholder="Enter amount"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="notes"
                label={<Text strong>Notes</Text>}
                rules={[{ required: true, message: "This field is required." }]}
              >
                <Input placeholder="Enter Notes" />
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
                  <Switch size="medium" />
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
        </Form>
      </Drawer>
    </>
  );
};

export default TransactionSetupForm;
