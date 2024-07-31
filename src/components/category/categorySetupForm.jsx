import { Button, Drawer, Form, Input, message } from "antd";
import { useEffect } from "react";
import {
  useCreateExpenseCategory,
  useCreateIncomeCategory,
  useCreateLoanCategory,
  useUpdateExpenseCategory,
  useUpdateIncomeCategory,
  useUpdateLoanCategory,
} from "../../pages/category/services/useCategory";
import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";
import { customMutation } from "../../services/customMutation";

const CategorySetupForm = ({
  isDrawerOpen,
  onClose,
  type,
  refetch,
  mode,
  record = {},
}) => {
  const [form] = Form.useForm();
  const createIncomeCategory = useCreateIncomeCategory();
  const createExpenseCategory = useCreateExpenseCategory();
  const createLoanCategory = useCreateLoanCategory();
  const updateIncomeCategory = useUpdateIncomeCategory();
  const updateExpenseCategory = useUpdateExpenseCategory();
  const updateLoanCategory = useUpdateLoanCategory();

  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    message.success(
      `${capitalizeInitialChar(type)} category ${action} successfully.`
    );
    onClose();
    refetch();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} ${type} category.`);
  };

  const OnFinish = (values) => {
    const categoryMap = {
      income: {
        create: createIncomeCategory,
        update: updateIncomeCategory,
      },
      expense: {
        create: createExpenseCategory,
        update: updateExpenseCategory,
      },
      loan: {
        create: createLoanCategory,
        update: updateLoanCategory,
      },
    };

    const currentCategory = categoryMap[type][mode];

    const payload = mode === "create" ? values : { ...values, id: record.id };

    customMutation(
      currentCategory,
      payload,
      handleMutationSuccess,
      handleMutationError
    );
  };

  useEffect(() => {
    if ((mode == "update" || mode == "view") && record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [mode, record, form]);

  return (
    <>
      <Drawer
        title={`${capitalizeInitialChar(type)} Category`}
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
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          {mode !== "view" && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default CategorySetupForm;
