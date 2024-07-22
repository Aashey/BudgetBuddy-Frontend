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
} from "antd";
import LoginLogo from "./Logo";
import { NavLink } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import FormDebug from "../../helper/FormDebug";

const LoginForm = () => {
  const [form] = Form.useForm();
  const { Text, Title, Link } = Typography;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4">
      <LoginLogo />
      <div className="lg:col-span-1"></div>
      <div className="lg:col-span-4 flex flex-col justify-center p-12">
        <Title>Login</Title>
        <Text className="text-gray-600">Login to track your finances</Text>

        <Form form={form} className="mt-11 mb-4 w-full" layout="vertical">
          {/* <Form.Item shouldUpdate>
            {() => <pre>{JSON.stringify(form.getFieldValue(), null, 2)}</pre>}
          </Form.Item> */}
          <Form.Item
            name="username"
            label={
              <Text className="text-gray-600" strong>
                Username
              </Text>
            }
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
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
