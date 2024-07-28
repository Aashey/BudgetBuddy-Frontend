import { Button, Card, Layout, Menu, message, Space, Typography } from "antd";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth";
import {
  HiMiniWrenchScrewdriver,
  HiOutlineArrowRightOnRectangle,
  HiMiniChartPie,
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
} from "react-icons/hi2";
import { TbPigMoney, TbTransactionDollar } from "react-icons/tb";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";

const CustomSider = () => {
  const { Sider } = Layout;
  const location = useLocation();
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
      key: "/dashboard",
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      icon: <HiMiniChartPie size={20} />,
    },
    {
      key: "/setup",
      label: "Setup",
      icon: <HiMiniWrenchScrewdriver />,
      children: [
        {
          key: "/setup/income-category",
          label: <NavLink to="/setup/income-category">Income Category</NavLink>,
          icon: <HiMiniArrowTrendingUp />,
        },
        {
          key: "/setup/expense-category",
          label: (
            <NavLink to="/setup/expense-category">Expense Category</NavLink>
          ),
          icon: <HiMiniArrowTrendingDown />,
        },
        {
          key: "/setup/loan-category",
          label: <NavLink to="/setup/loan-category">Loan Category</NavLink>,
          icon: <HiMiniArrowTrendingDown />,
        },
      ],
    },
    {
      key: "/transaction",
      label: "Transaction",
      icon: <TbTransactionDollar size={22} />,
      children: [
        {
          key: "/transaction",
          label: <NavLink to="/transaction">Transaction</NavLink>,
          icon: <TbTransactionDollar size={22} />,
        },
        {
          key: "/transaction/income",
          label: <NavLink to="/transaction/income">Income</NavLink>,
          icon: <GiReceiveMoney size={22} />,
        },
        {
          key: "/transaction/expense",
          label: <NavLink to="/transaction/expense">Expense</NavLink>,
          icon: <GiPayMoney size={22} />,
        },
        {
          key: "/transaction/saving",
          label: <NavLink to="/transaction/saving">Saving</NavLink>,
          icon: <TbPigMoney size={22} />,
        },
        {
          key: "/transaction/loan",
          label: <NavLink to="/transaction/loan">Loan</NavLink>,
          icon: <GiTakeMyMoney size={22} />,
        },
      ],
    },
    {
      key: "/logout",
      label: <Typography.Link onClick={onLogout}>Logout</Typography.Link>,
      icon: <HiOutlineArrowRightOnRectangle size={20} />,
    },
  ];
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};

export default CustomSider;
