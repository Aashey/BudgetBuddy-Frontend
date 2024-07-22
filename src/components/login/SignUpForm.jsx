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
} from "antd";
import LoginLogo from "./Logo";
import { NavLink } from "react-router-dom";
import TermsAndConditions from "../../helper/TermsConditions";

const SignupForm = () => {
  const [form] = Form.useForm();
  const { Text, Title, Link } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="grid w-full grid-flow-row lg:grid-cols-12 gap-x-4 ">
      <LoginLogo />
      <div className="lg:col-span-1"></div>

      <div className="lg:col-span-4 flex flex-col justify-center p-12">
        <Title>Get Started</Title>
        <Text className="text-gray-600">Create your free account now</Text>
        <Form form={form} className="mt-11 mb-4 w-full" layout="vertical">
          {/* <Form.Item shouldUpdate>
            {() => <pre>{JSON.stringify(form.getFieldValue(), null, 2)}</pre>}
          </Form.Item> */}

          <Form.Item
            name="full_name"
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
                Email Address
              </Text>
            }
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
          >
            <Input.Password placeholder="Password" />
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
        {/* <Modal
          title="Terms and Conditions"
          open={isModalOpen}
          onCancel={closeModal}
          onClose={closeModal}
          footer={false}
          width={800}
        >
          <TermsAndConditions />
        </Modal> */}
        <Text className="pt-10">
          Already have an account ? <NavLink to="/login">Login</NavLink>
        </Text>
      </div>
    </div>
  );
};

export default SignupForm;
