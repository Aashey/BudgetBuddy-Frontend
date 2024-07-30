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
import {
  // useCreateExpenseTransaction,
  useCreateIncomeTransaction,
  useUpdateIncomeTransaction,
  //   useCreateLoanTransaction,
  //   useUpdateExpenseTransaction,
  //   useUpdateLoanTransaction,
} from "../../pages/transaction/services/useTransaction";
import { useIncomeCategory } from "../../pages/category/services/useCategory";
import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";
import dayjs from "dayjs";
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
  // const createExpenseTransaction = useCreateExpenseTransaction();
  // const createLoanTransaction = useCreateLoanTransaction();
  const updateIncomeTransaction = useUpdateIncomeTransaction();
  // const updateExpenseTransaction = useUpdateExpenseTransaction();
  // const updateLoanTransaction = useUpdateLoanTransaction();
  const {
    data: incomeCategoryData,
    error: incomeCategoryError,
    isLoading: incomeCategoryIsLoading,
  } = useIncomeCategory();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const updatedData = incomeCategoryData?.data?.data?.map((data) => ({
      value: data.id,
      label: data.title,
    }));
    setCategoryData(updatedData);
  }, [incomeCategoryData]);

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    message.success(
      `${capitalizeInitialChar(type)} transaction ${action} successfully.`
    );
    onClose();
    refetch();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} ${type} transaction.`);
  };

  const OnFinish = (values) => {
    const reformattedValues = {
      ...values,
      date_received: dayjs(values.date_received).format("YYYY-MM-DD"),
      is_recurring:
        values.is_recurring === undefined ? null : values.is_recurring,
    };
    console.log(reformattedValues);
    if (type === "income") {
      if (mode === "create") {
        createIncomeTransaction.mutate(reformattedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      } else {
        const updatedValues = {
          title: values.title,
          description: values.description,
          id: record.id,
        };
        updateIncomeTransaction.mutate(updatedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      }
    }
    //  else if (type === "expense") {
    //   if (mode === "create") {
    //     createExpenseTransaction.mutate(values, {
    //       onSuccess: handleMutationSuccess,
    //       onError: handleMutationError,
    //     });
    //   } else {
    //     const updatedValues = {
    //       title: values.title,
    //       description: values.description,
    //       id: record.id,
    //     };
    //     updateExpenseTransaction.mutate(updatedValues, {
    //       onSuccess: handleMutationSuccess,
    //       onError: handleMutationError,
    //     });
    //   }
    // } else {
    //   if (mode === "create") {
    //     createLoanTransaction.mutate(values, {
    //       onSuccess: handleMutationSuccess,
    //       onError: handleMutationError,
    //     });
    //   } else {
    //     const updatedValues = {
    //       title: values.title,
    //       description: values.description,
    //       id: record.id,
    //     };
    //     updateLoanTransaction.mutate(updatedValues, {
    //       onSuccess: handleMutationSuccess,
    //       onError: handleMutationError,
    //     });
    //   }
    // }
  };

  useEffect(() => {
    if ((mode == "edit" || mode == "view") && record) {
      form.setFieldsValue(record);
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
          <FormDebug form={form} />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Category</Text>}
                name="category_id"
                rules={[{ required: true, message: "This field is required." }]}
              >
                <Select
                  showSearch
                  loading={incomeCategoryIsLoading}
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
              <Form.Item
                name="amount"
                label={<Text strong>Amount</Text>}
                rules={[{ required: true, message: "This field is required." }]}
              >
                <InputNumber
                  addonBefore="Rs."
                  style={{ width: "100%" }}
                  placeholder="Enter amount"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Date</Text>}
                name={`date_${type === "income" ? "received" : "spent"}`}
              >
                <DatePicker style={{ width: "100%" }} />
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
          <Form.Item
            label={<Text strong>Is Recurring</Text>}
            name="is_recurring"
          >
            <Switch size="medium" />
          </Form.Item>

          {mode !== "view" && (
            <Form.Item>
              <Button
                className="w-[12rem] m-auto"
                type="primary"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default TransactionSetupForm;
