import { Button, Dropdown, Input, Space, Tooltip } from "antd";
import { HiPlus } from "react-icons/hi2";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";
import { CiSearch } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";
import DateFilter from "../filter";
const LowerHeader = ({ handleCreateComponent, handleSearch, textProp }) => {
  return (
    <Space className="mb-4 flex justify-between">
      <span className="flex gap-2">
        <DateFilter />
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
      </span>

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
