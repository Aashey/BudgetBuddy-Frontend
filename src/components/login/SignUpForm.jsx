import React, { useState } from "react";
import {
  Card,
  Space,
  Row,
  Col,
  Form,
  Input,
  Typography,
  Button,
  Divider,
  Checkbox,
  Modal,
  message,
} from "antd";
import LoginLogo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import TermsAndConditions from "../../helper/TermsConditions";
import { useRegister } from "../../pages/login/services/useRegister";

const SignupForm = () => {
  const [form] = Form.useForm();
  const { Text, Title, Link } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
    const { username, email, password, password_confirmation } = values;
    registerMutation.mutate(
      { username, email, password, password_confirmation },
      {
        onSuccess: () => {
          message.success("User Registered successfully.");
          navigate("/dashboard");
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || "Registration Failed."
          );
        },
      }
    );
  };
  return (
    <div className="grid width-[100vh] grid-flow-row lg:grid-cols-12 gap-x-4">
      <LoginLogo />
      <div className="lg:col-span-1"></div>

      <div className="lg:col-span-4 flex flex-col justify-center p-8">
        <Title>Get Started</Title>
        <Text className="text-gray-600">Create your free account now</Text>
        <Form
          onFinish={onFinish}
          form={form}
          className="mt-4 w-full"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label={
              <Text className="text-gray-600" strong>
                Username
              </Text>
            }
            rules={[
              { required: true, message: "Username is required" },
              {
                pattern: /\d/, // Regular expression to check for a number
                message: "Username must include at least one number",
              },
            ]}
            validateDebounce="1000"
          >
            <Input placeholder="Username" className="w-full" />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <Text className="text-gray-600" strong>
                Email Address
              </Text>
            }
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
            validateDebounce="1000"
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <Text className="text-gray-600" strong>
                Password
              </Text>
            }
            rules={[
              {
                required: true,
                message: "Password is required",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
            validateDebounce="1000"
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label={
              <Text className="text-gray-600" strong>
                Confirm Password
              </Text>
            }
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Password confirmation is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            validateDebounce="1000"
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item name="terms">
            <Checkbox className="mr-2" />I agree to the{" "}
            <Link className="text-gray-700 cursor-pointer" onClick={openModal}>
              terms and conditions{" "}
            </Link>
            .
          </Form.Item>

          <Button block type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form>
        <Modal
          title="Terms and Conditions"
          open={isModalOpen}
          onCancel={closeModal}
          onClose={closeModal}
          footer={false}
          width={800}
        >
          <TermsAndConditions />
        </Modal>
        <Text className="mt-4">
          Already have an account ? <NavLink to="/login">Login</NavLink>
        </Text>
      </div>
    </div>
  );
};

export default SignupForm;
