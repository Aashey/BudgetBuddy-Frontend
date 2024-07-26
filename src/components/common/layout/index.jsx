import React from "react";
import CustomSider from "../sider";
import { Card, Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "../header";

const CustomLayout = () => {
  const { Content } = Layout;
  return (
    <>
      <Layout
        theme="light"
        style={{
          minHeight: "100vh",
        }}
      >
        <CustomSider />
        <Content>
          <Card className="m-auto p-8 w-[100%] h-[100vh]">
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default CustomLayout;
