import React from "react";
import CustomSider from "../sider";
import { Card, Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "../header";
import NavBar from "../nav";

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
        <Layout>
          <NavBar />
          <Layout>
            <Content>
              <div className=" bg-white m-auto w-[100%] min-h-full h-auto">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
