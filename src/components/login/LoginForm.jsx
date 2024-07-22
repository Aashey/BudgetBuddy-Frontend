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

const LoginForm = () => {
  const { Text, Title, Link } = Typography;
  return (
    <div className="grid w-full grid-flow-row lg:grid-cols-12 gap-x-2 ">
      <div className="lg:col-span-7">
        <img src="../public/login3.jpg" alt="LOGIN" className="h-[100vh]" />
      </div>

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
          Already have an account ? <Link>Login</Link>
        </Text>
      </div>
    </div>
    /* <div className="flex justify-center items-center h-screen">
      <Row gutter={16}>
        <Col span={12}>
          <Space>
            <img src="../public/login.jpg" alt="" style={{ width: "100%" }} />
          </Space>
        </Col>
        <Col span={12}>
          <Card className="p-2 items-center">
            <Title>Login</Title>
            <Form>
              <Form.Item name="username" label="Username">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password />
              </Form.Item>
              <Button block type="primary" htmlType="submit">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div> */
  );
};

export default LoginForm;
