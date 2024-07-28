import { Button, Drawer, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import {
  useCreateExpenseCategory,
  useCreateIncomeCategory,
  useCreateLoanCategory,
} from "../../pages/category/services/useCategory";
import { capitalizeInitialChar } from "../../helper/capitalizeInitialChar";

const CategorySetupForm = ({ isDrawerOpen, onClose, type, refetch }) => {
  const [form] = Form.useForm();
  const createIncomeCategory = useCreateIncomeCategory();
  const createExpenseCategory = useCreateExpenseCategory();
  const createLoanCategory = useCreateLoanCategory();

  const handleMutationSuccess = () => {
    message.success(
      `${capitalizeInitialChar(type)} category added successfully.`
    );
    refetch();
    form.resetFields();
    onClose();
  };

  const handleMutationError = () => {
    message.error(`Failed to add ${type} category.`);
  };

  const OnFinish = (values) => {
    if (type === "income") {
      createIncomeCategory.mutate(values, {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      });
    } else if (type === "expense") {
      createExpenseCategory.mutate(values, {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      });
    } else {
      createLoanCategory.mutate(values, {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      });
    }
  };

  return (
    <>
      <Drawer
        title={`${capitalizeInitialChar(type)} Category`}
        width={700}
        open={isDrawerOpen}
        onClose={onClose}
      >
        <Form layout="vertical" className="p-6" onFinish={OnFinish} form={form}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CategorySetupForm;
