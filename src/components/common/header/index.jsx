import { Button, Divider, Typography } from "antd";
import { CiExport } from "react-icons/ci";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";
import { HiPlus } from "react-icons/hi2";

const TitleHeader = ({
  textProp,
  handleCreateComponent,
  goalData,
  openModal,
}) => {
  console.log(goalData);

  return (
    <div className="header p-4 bg-[#EDEDFA]">
      <div className="flex justify-between align-center ">
        <span>
          <Typography.Title className="text-white" level={3}>
            {capitalizeInitialChar(textProp.type)}{" "}
            {capitalizeInitialChar(textProp.method)}
          </Typography.Title>
          <Typography.Text className="custom-font">
            Manage all your {textProp.type} {textProp.plural_method} here
          </Typography.Text>
        </span>

        <span className="flex justify-between">
          {textProp.type === "saving" && goalData && (
            <>
              {" "}
              <Button
                className="bg-yellow-600 text-white p-2 mt-5 mr-2 hover:bg-yellow-400"
                onClick={openModal}
              >
                {" "}
                {goalData.length === 0
                  ? "add a saving goal"
                  : "view your saving goal"}
              </Button>
            </>
          )}
          <Button
            className="custom-font p-2 mt-5"
            onClick={handleCreateComponent}
            icon={<HiPlus size={16} />}
            type="primary"
          >
            Add {capitalizeInitialChar(textProp.type)}{" "}
          </Button>
        </span>
      </div>
    </div>
  );
};

export default TitleHeader;
