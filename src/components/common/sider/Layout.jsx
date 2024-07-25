import { Button, Card, Layout, Menu, message, Typography } from "antd";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth";
import {
  HiMiniWrenchScrewdriver,
  HiOutlineArrowRightOnRectangle,
  HiMiniChartPie,
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
  HiMiniChevronDoubleRight,
} from "react-icons/hi2";

const CustomLayout = () => {
  const { Sider, Content } = Layout;
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    setTimeout(() => {
      message.success("Logged out successfully.");
      navigate("/login");
    }, [500]);
  };
  const items = [
    {
      key: "1",
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      icon: <HiMiniChartPie size={20} />,
    },
    {
      key: "2",
      label: "Setup",
      icon: <HiMiniWrenchScrewdriver />,
      children: [
        {
          key: "3",
          label: <NavLink to="/setup/income-category">Income Category</NavLink>,
          icon: <HiMiniArrowTrendingUp />,
        },
        {
          key: "4",
          label: (
            <NavLink to="/setup/expense-category">Expense Category</NavLink>
          ),
          icon: <HiMiniArrowTrendingDown />,
        },
      ],
    },
    {
      key: "5",
      label: <Typography.Link onClick={onLogout}>Logout</Typography.Link>,
      icon: <HiOutlineArrowRightOnRectangle size={20} />,
    },
  ];
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Layout
        theme="light"
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Card>BUDGET BUDDY WIP...</Card>
          <Card className="m-auto mt-20 p-2 w-[90%]">
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default CustomLayout;
