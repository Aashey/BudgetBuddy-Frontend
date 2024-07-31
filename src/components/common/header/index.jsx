import { Button, Typography } from "antd";
import { CiExport } from "react-icons/ci";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";

const TitleHeader = ({ textProp, handleCreateComponent }) => {
  return (
    <div className="bg-[#ededfa] text-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-between align-center ">
        <span>
          <Typography.Title className="text-white" level={2}>
            {capitalizeInitialChar(textProp.type)}{" "}
            {capitalizeInitialChar(textProp.method)}
          </Typography.Title>
          <Typography.Text>
            Manage all your {textProp.type} {textProp.plural_method} or
            <Typography.Link onClick={handleCreateComponent}>
              {" "}
              add a new {textProp.method}.
            </Typography.Link>
          </Typography.Text>
        </span>
        <Button className="bg-white p-5 mt-4" icon={<CiExport size={18} />}>
          Export
        </Button>
      </div>
    </div>
  );
};

export default TitleHeader;
