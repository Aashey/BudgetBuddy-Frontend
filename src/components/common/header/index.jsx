import { Button, Divider, Typography } from "antd";
import { CiExport } from "react-icons/ci";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";
import { HiPlus } from "react-icons/hi2";

const TitleHeader = ({ textProp, handleCreateComponent }) => {
  return (
    <div className="header p-4 bg-[#EDEDFA]">
      <div className="flex justify-between align-center ">
        <span>
          <Typography.Title className="text-white" level={3}>
            {capitalizeInitialChar(textProp.type)}{" "}
            {capitalizeInitialChar(textProp.method)}
          </Typography.Title>
          <Typography.Text className="custom-font">
            Manage all your {textProp.type} {textProp.plural_method} or
            <Typography.Link onClick={handleCreateComponent}>
              {" "}
              add a new {textProp.method}.
            </Typography.Link>
          </Typography.Text>
        </span>

        <Button
          className="custom-font p-2 mt-5"
          onClick={handleCreateComponent}
          icon={<HiPlus size={16} />}
          type="primary"
        >
          Add {capitalizeInitialChar(textProp.type)}{" "}
        </Button>
      </div>
    </div>
  );
};

export default TitleHeader;
