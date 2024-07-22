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
} from "antd";
import LoginLogo from "./login/Logo";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const { Text, Title, Link } = Typography;
  return (
    <div className="grid w-full grid-flow-row lg:grid-cols-12 gap-x-2">
      <LoginLogo />
      <div className="lg:col-span-5 flex flex-col justify-center p-10">
        <Title>LOGIN</Title>
        <Form className="mt-11 mb-4 w-full" layout="vertical">
          <Form.Item
            name="username"
            label={
              <Text className="text-gray-600" strong>
                Username
              </Text>
            }
          >
            <Input placeholder="Full Name" className="w-full" />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <Text className="text-gray-600" strong>
                Enter password
              </Text>
            }
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
        <Text className="pt-10">
          {" "}
          Donot have an account yet ? <NavLink to="/signup">Sign Up</NavLink>
        </Text>
      </div>
    </div>
  );
};

export default LoginForm;
