import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

const CustomHeader = () => {
  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span className="flex justify-between">
          <span>BUDGET BUDDY</span>
        </span>
      </Header>
    </>
  );
};

export default CustomHeader;
