import { Button, Input, Space } from "antd";
import { HiPlus } from "react-icons/hi2";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";

const LowerHeader = ({ handleCreateComponent, handleSearch, textProp }) => {
  return (
    <Space className="mt-5 mb-3 flex justify-between">
      <Input.Search addonBefore="Search" onChange={handleSearch} />
      <Button
        onClick={handleCreateComponent}
        icon={<HiPlus size={20} />}
        type="primary"
      >
        Add {capitalizeInitialChar(textProp.type)}{" "}
      </Button>
    </Space>
  );
};

export default LowerHeader;
