import { Button, Input, Space, Tooltip } from "antd";
import { HiPlus } from "react-icons/hi2";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";
import { CiSearch } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";
const LowerHeader = ({ handleCreateComponent, handleSearch, textProp }) => {
  return (
    <Space className="mb-4 flex justify-between">
      {(textProp.type === "income" ||
        textProp.type === "expense" ||
        textProp.type === "loan") && (
        <>
          <Input
            prefix={<CiSearch size={14} />}
            onChange={handleSearch}
            placeholder="Search"
          />
        </>
      )}
      <Tooltip title="Export to excel">
        <Button
          className="custom-font bg-white"
          icon={<FaRegFileExcel size={16} />}
        >
          Excel
        </Button>
      </Tooltip>
    </Space>
  );
};

export default LowerHeader;
