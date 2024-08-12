import { Form, Input, Typography } from "antd";

const Inputs = ({ form, InputProps }) => {
  const { Text } = Typography;
  return (
    <>
      <Form form={form}>
        <Form.Item
          label={<Text strong>{InputProps?.label}</Text>}
          name={InputProps?.name}
          rules={InputProps?.rules}
        >
          <Input form={form} style={{ color: "black" }} />
        </Form.Item>
      </Form>
    </>
  );
};

export default Inputs;
