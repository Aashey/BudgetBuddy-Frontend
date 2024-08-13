import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Typography,
} from "antd";
import { FaUser } from "react-icons/fa";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "./services/userProfile";
import { disableAfterToday } from "../../helper/disableDates";
import { useEffect } from "react";

const UserProfile = () => {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const { data, error, isLoading, refetch } = useGetUserProfile();
  const updateProfile = useUpdateUserProfile();
  console.log(data?.data?.data);

  const onSuccess = () => {
    message.success("Profile updated successfully!");
    refetch();
  };
  const onError = () => {
    return message.error("Failed to update profile!");
  };
  useEffect(() => {
    form.setFieldsValue(data?.data?.data);
  }, [data, form, refetch]);

  const updateUserProfile = (values) => {
    console.log("Values", values);
    updateProfile.mutate(values, { onSuccess, onError });
  };
  return (
    <>
      <div className="mx-auto  p-6  shadow-md w-[60vw] h-[80vh]">
        <Form onFinish={updateUserProfile} form={form} layout="vertical">
          <div className="flex flex-col  items-center mb-4">
            <Avatar
              className="text-9xl bg-black size-16"
              icon={<FaUser size={40} />}
            />
            <Title>User Profile</Title>
          </div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label={<Text strong>Username</Text>} name={"username"}>
                <Input style={{ color: "black" }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text strong>Email</Text>} name={"email"}>
                <Input style={{ color: "black" }} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="first_name"
                label={<Text strong>First Name</Text>}
              >
                <Input placeholder="Your First Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="middle_name"
                label={<Text strong>Middle Name</Text>}
              >
                <Input placeholder="Your Middle Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="last_name" label={<Text strong>Last Name</Text>}>
                <Input placeholder="Your Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="phone_number"
                label={<Text strong>Phone Number</Text>}
              >
                <InputNumber
                  placeholder="10 digits number"
                  className="w-full"
                  prefix="+977-"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="dob" label={<Text strong>Date of Birth</Text>}>
                {/* <DatePicker
                  disabledDate={disableAfterToday}
                  className="w-full"
                /> */}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="address" label={<Text strong>Address</Text>}>
                <Input placeholder="Your Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Button htmlType="submit" type="primary" className="w-full">
                Update Profile
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default UserProfile;
