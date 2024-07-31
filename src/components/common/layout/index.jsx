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
          <Card className="m-auto p-1 w-[100%] min-h-[100vh] h-auto">
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default CustomLayout;
