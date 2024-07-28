import { Button, Drawer, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import {
  useCreateExpenseCategory,
  useCreateIncomeCategory,
  useCreateLoanCategory,
  useUpdateExpenseCategory,
  useUpdateIncomeCategory,
  useUpdateLoanCategory,
} from "../../pages/category/services/useCategory";
import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";

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
  console.log(mode);
  const handleMutationSuccess = () => {
    const action = mode === "create" ? "added" : "updated";
    message.success(
      `${capitalizeInitialChar(type)} category ${action} successfully.`
    );
    refetch();
    form.resetFields();
    onClose();
  };

  const handleMutationError = () => {
    const action = mode === "create" ? "add" : "update";
    message.error(`Failed to ${action} ${type} category.`);
  };

  const OnFinish = (values) => {
    if (type === "income") {
      if (mode === "create") {
        createIncomeCategory.mutate(values, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      } else {
        const updatedValues = {
          title: values.title,
          description: values.description,
          id: record.id,
        };
        updateIncomeCategory.mutate(updatedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      }
    } else if (type === "expense") {
      if (mode === "create") {
        createExpenseCategory.mutate(values, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      } else {
        const updatedValues = {
          title: values.title,
          description: values.description,
          id: record.id,
        };
        updateExpenseCategory.mutate(updatedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      }
    } else {
      if (mode === "create") {
        createLoanCategory.mutate(values, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      } else {
        const updatedValues = {
          title: values.title,
          description: values.description,
          id: record.id,
        };
        updateLoanCategory.mutate(updatedValues, {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        });
      }
    }
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
