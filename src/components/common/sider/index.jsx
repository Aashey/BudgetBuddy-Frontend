import { Button, Layout, Menu, message, Typography } from "antd";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../../services/auth";
import { HiMiniChartPie } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";

import { TbCategoryPlus, TbReportMoney } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";

const CustomSider = () => {
  const { Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "/dashboard",
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      icon: <HiMiniChartPie size={22} />,
    },
    {
      key: "/categories",
      label: "Categories",
      icon: <TbCategoryPlus size={22} />,
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
      icon: <MdOutlineAttachMoney size={22} />,
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
      key: "/analytics",
      label: "Analytics",
      icon: <TbReportMoney size={22} />,
      children: [
        {
          key: "/analytics/balance",
          label: <NavLink to="/analytics/balance">Balance</NavLink>,
        },
        {
          key: "/report/expense-report",
          label: <NavLink to="/report/expense-report">Expense Report</NavLink>,
        },
      ],
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
          zIndex: 101,
        }}
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
