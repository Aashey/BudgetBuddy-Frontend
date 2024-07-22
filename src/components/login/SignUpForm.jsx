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
import LoginLogo from "./Logo";
import { NavLink } from "react-router-dom";

const SignupForm = () => {
  const { Text, Title, Link } = Typography;
  return (
    <div className="grid w-full grid-flow-row lg:grid-cols-12 gap-x-2 ">
      <LoginLogo />

      <div className="lg:col-span-5 flex flex-col justify-center p-10">
        <Title>Get Started</Title>
        <Text className="text-gray-600">Create your account now</Text>
        <Form className="mt-11 mb-4 w-full" layout="vertical">
          <Form.Item
            name="username"
            label={
              <Text className="text-gray-600" strong>
                Full Name
              </Text>
            }
          >
            <Input placeholder="Full Name" className="w-full" />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <Text className="text-gray-600" strong>
                Email
              </Text>
            }
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <Text className="text-gray-600" strong>
                Choose password
              </Text>
            }
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form>
        <Text className="pt-10">
          {" "}
          Already have an account ? <NavLink to="/login">Login</NavLink>
        </Text>
      </div>
    </div>
  );
};

export default SignupForm;
