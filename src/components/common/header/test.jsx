import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { capitalizeInitialChar } from "../../../helper/capitalizeInitialChar";

const TitleHeader = ({
  children,
  handleCreateComponent,
  type,
  goalData,
  openModal,
  buttonMode,
}) => {
  return (
    <div className="header p-4 bg-[#EDEDFA]">
      <div className="flex justify-between align-center ">
        <span>
          <Typography.Title level={3}>{children}</Typography.Title>
          Manage your {children.toLowerCase()} here.
        </span>
        <span>
          {type === "saving" && (
            <Button
              icon={<HiPlus size={16} />}
              type="none"
              onClick={openModal}
              className="custom-font bg-orange-600 text-white p-2 mt-5 mr-2 hover:bg-orange-600"
            >
              {`${buttonMode} Goal`}
            </Button>
          )}
          <Button
            className="custom-font p-2 mt-5"
            onClick={handleCreateComponent}
            icon={<HiPlus size={16} />}
            type="primary"
          >
            Add {children.toLowerCase()}
          </Button>
        </span>
      </div>
    </div>
  );
};

export default TitleHeader;
