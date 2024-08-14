import { Avatar, Dropdown, Layout, Menu, message, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { CiLogout } from "react-icons/ci";
import { FaEdit, FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useLogout } from "../../../services/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetTotalData } from "../../../pages/dashboard/services/useTotalData";
import Title from "antd/es/typography/Title";

const NavBar = () => {
  const { data: totalData } = useGetTotalData();

  const navigate = useNavigate();

  const logout = useLogout();

  const onLogout = () => {
    logout.mutate();
    setTimeout(() => {
      localStorage.removeItem("authToken");
      message.success("Logged out successfully!");
      navigate("/login");
    }, 500);
  };
  return (
    <>
      <Header
        theme="light"
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px",
          zIndex: 100,
          position: "sticky",
          top: 0,
          left: 0,
          boxShadow: "0 0 2px 1px rgba(0,0,0,0.2)",
        }}
      >
        <span>
          <Title style={{ color: "#2d5bbd" }} level={3}>
            BUDGET BUDDY
          </Title>
        </span>
        <span>
          {totalData?.data?.data?.username}
          <Dropdown
            className="ml-2"
            overlay={
              <>
                <Menu theme="light" style={{ width: "170px" }}>
                  <Menu.Item key="view" icon={<IoEyeSharp size={18} />}>
                    <NavLink to="/profile">View Profile</NavLink>
                  </Menu.Item>

                  <Menu.Item key={"password"} icon={<FaEdit size={18} />}>
                    Change Password
                  </Menu.Item>

                  <Menu.Item key={"/logout"} icon={<CiLogout size={18} />}>
                    <Typography.Link onClick={onLogout}>Logout</Typography.Link>
                  </Menu.Item>
                </Menu>
              </>
            }
            trigger={["click"]}
          >
            <Avatar
              className=" bg-black size-8 cursor-pointer"
              icon={<FaUser size={18} />}
            />
          </Dropdown>
        </span>
      </Header>
    </>
  );
};

export default NavBar;
