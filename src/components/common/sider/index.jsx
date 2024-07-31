import {
  Button,
  Card,
  Input,
  Layout,
  Menu,
  message,
  Space,
  Typography,
} from "antd";
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
  const { Title } = Typography;
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
      key: "/categories",
      label: "Categories",
      icon: <HiMiniWrenchScrewdriver />,
      children: [
        {
          key: "/setup/income-category",
          label: <NavLink to="/setup/income-category">Income Category</NavLink>,
        },
        {
          key: "/setup/expense-category",
          label: (
            <NavLink to="/setup/expense-category">Expense Category</NavLink>
          ),
        },
        {
          key: "/setup/loan-category",
          label: <NavLink to="/setup/loan-category">Loan Category</NavLink>,
        },
      ],
    },
    {
      key: "/transactions",
      label: "Transactions",
      icon: <TbTransactionDollar size={22} />,
      children: [
        {
          key: "/transaction",
          label: <NavLink to="/transaction">Transaction</NavLink>,
        },
        {
          key: "/transaction/income",
          label: <NavLink to="/transaction/income">Income</NavLink>,
        },
        {
          key: "/transaction/expense",
          label: <NavLink to="/transaction/expense">Expense</NavLink>,
        },
        {
          key: "/transaction/saving",
          label: <NavLink to="/transaction/saving">Saving</NavLink>,
        },
        {
          key: "/transaction/withdraw",
          label: <NavLink to="/transaction/withdraw">Withdraw</NavLink>,
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
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        theme="light"
        collapsed={false}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Title
          style={{ color: "#2d5bbd" }}
          level={3}
          className="flex justify-center mt-2 mb-4"
        >
          Budget Buddy
        </Title>
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
