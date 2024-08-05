import { Button, Input, Space } from "antd";
import { HiPlus } from "react-icons/hi2";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";

const LowerHeader = ({ handleCreateComponent, handleSearch, textProp }) => {
  return (
    <Space className="mt-5 mb-3 flex justify-between">
      <Button
        className="custom-font p-2"
        onClick={handleCreateComponent}
        icon={<HiPlus size={16} />}
        type="primary"
      >
        Add {capitalizeInitialChar(textProp.type)}{" "}
      </Button>
      {(textProp.type === "income" ||
        textProp.type === "expense" ||
        textProp.type === "loan") && (
        <>
          <Input.Search
            addonBefore="Search"
            onChange={handleSearch}
            placeholder={`${capitalizeInitialChar(textProp.type)} ${
              textProp.plural_method
            }`}
          />
        </>
      )}
    </Space>
  );
};

export default LowerHeader;
