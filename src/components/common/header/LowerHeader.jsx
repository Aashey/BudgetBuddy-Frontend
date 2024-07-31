import { Button, Input, Space } from "antd";
import { HiPlus } from "react-icons/hi2";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";

const LowerHeader = ({ handleCreateComponent, handleSearch, textProp }) => {
  return (
    <Space className="mt-5 mb-3 flex justify-between">
      <Button
        onClick={handleCreateComponent}
        icon={<HiPlus size={20} />}
        type="primary"
      >
        Add {capitalizeInitialChar(textProp.type)}{" "}
        {capitalizeInitialChar(textProp.method)}
      </Button>
      <Input.Search
        onChange={handleSearch}
        placeholder={`Search ${textProp.type} ${textProp.plural_method}`}
      />
    </Space>
  );
};

export default LowerHeader;
