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
  useCreateExpenseTransaction,
  // useCreateExpenseTransaction,
  useCreateIncomeTransaction,
  useUpdateExpenseTransaction,
  useUpdateIncomeTransaction,
  //   useCreateLoanTransaction,
  //   useUpdateExpenseTransaction,
  //   useUpdateLoanTransaction,
} from "../../pages/transaction/services/useTransaction";
import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";
import dayjs from "dayjs";
import FormDebug from "../../helper/FormDebug";
import useCategoryData from "../../pages/category/services/useCategoryData";

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
  // const createLoanTransaction = useCreateLoanTransaction();
  const updateIncomeTransaction = useUpdateIncomeTransaction();
  const updateExpenseTransaction = useUpdateExpenseTransaction();
  // const updateLoanTransaction = useUpdateLoanTransaction();

  const { data, error, isLoading } = useCategoryData(type);

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const updatedData = data?.data?.data?.map((data) => ({
      value: data.id,
      label: data.title,
    }));
    setCategoryData(updatedData);
  }, [data]);

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
      category_id: values.category_title,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      is_recurring:
        values.is_recurring === undefined ? false : values.is_recurring,
    };
    console.log(reformattedValues);
    if (type === "income") {
      if (mode === "create") {
        createIncomeTransaction.mutate(
          { ...reformattedValues, date_received: reformattedValues.date },
          {
            onSuccess: handleMutationSuccess,
            onError: handleMutationError,
          }
        );
      } else {
        const updatedValues = {
          ...reformattedValues,
          date_received: reformattedValues.date,
          id: record.id,
        };

        updateIncomeTransaction.mutate(updatedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      }
    } else if (type === "expense") {
      if (mode === "create") {
        createExpenseTransaction.mutate(
          { ...reformattedValues, date_spent: reformattedValues.date },
          {
            onSuccess: handleMutationSuccess,
            onError: handleMutationError,
          }
        );
      } else {
        const updatedValues = {
          ...reformattedValues,
          date_spent: reformattedValues.date,
          id: record.id,
        };
        updateExpenseTransaction.mutate(updatedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      }
    }
    //  else {
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
      console.log(categoryData);
      const requiredCategory = categoryData.filter(
        (data) => data.label === record.category_title
      );

      const category_id = requiredCategory[0].value;

      console.log(requiredCategory);
      console.log(category_id);
      form.setFieldsValue({
        ...record,
        category_title: category_id,
        date:
          type === "income"
            ? record.date_received
              ? dayjs(record.date_received)
              : null
            : record.date_spent
            ? dayjs(record.date_spent)
            : null,
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
          <FormDebug form={form} />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Category</Text>}
                name="category_title"
                rules={[{ required: true, message: "This field is required." }]}
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
              <Form.Item label={<Text strong>Date</Text>} name="date">
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
                {mode === "edit" ? "Update" : "Add"}
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default TransactionSetupForm;
