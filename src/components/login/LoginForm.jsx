import React from "react";
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
  message,
} from "antd";
import LoginLogo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import FormDebug from "../../helper/FormDebug";
import { useLogin } from "../../services/auth";
import axios from "axios";

const LoginForm = () => {
  const [form] = Form.useForm();
  const { Text, Title, Link } = Typography;
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const onFinish = (values) => {
    const { email, password } = values;

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          message.success("Logged in successfully.");
          navigate("/dashboard");
        },
        onError: (error) => {
          message.error(error.response?.data?.message || "Login Failed.");
        },
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4">
      <LoginLogo />
      <div className="lg:col-span-1"></div>
      <div className="lg:col-span-4 flex flex-col justify-center p-12">
        <Title>Login</Title>
        <Text className="text-gray-600">Login to track your finances</Text>

        <Form
          onFinish={onFinish}
          form={form}
          className="mt-11 mb-4 w-full"
          layout="vertical"
        >
          {/* <Form.Item shouldUpdate>
            {() => <pre>{JSON.stringify(form.getFieldValue(), null, 2)}</pre>}
          </Form.Item> */}
          <Form.Item
            name="email"
            label={
              <Text className="text-gray-600" strong>
                Email
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
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Email"
              className="w-full"
            />
          </Form.Item>
          <Form.Item>
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
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
              />
            </Form.Item>
            <Link className="login-form-forgot" strong>
              Forgot Password ?
            </Link>
          </Form.Item>
          <Form.Item name="remember">
            <Checkbox className="mr-2">Remember Login</Checkbox>
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
        <Text className="pt-10">
          Don't have an account yet ? <NavLink to="/signup">Sign Up</NavLink>
        </Text>
      </div>
    </div>
  );
};

export default LoginForm;
