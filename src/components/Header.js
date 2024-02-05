import React from "react";
import "../styles.css";
import { Layout, Typography, Button, Space, Badge } from "antd";
import {
  // DownOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

const { Header } = Layout;
const { Title } = Typography;

const IndusunoHeader = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  // const menu = (
  //   <Menu>
  //     <Menu.Item>Profile</Menu.Item>
  //     <Menu.Item>Settings</Menu.Item>
  //     <Menu.Item>Logout</Menu.Item>
  //   </Menu>
  // );

  return (
    <Header style={{ backgroundColor: "#000", padding: 0, color: "#fff" }}>
      <div style={{ float: "left", padding: "0 16px" }}>
        <Title level={3} style={{ color: "#fff" }}>
          Indusuno
        </Title>
      </div>
      <div style={{ float: "right", padding: "0 16px" }}>
        <Space>
          <Button type="text" style={{ marginRight: -18 }}>
            <QuestionCircleOutlined style={{ color: "#fff" }} />
          </Button>
          <Button type="text">
            <SearchOutlined style={{ color: "#fff" }} />
          </Button>
          <Badge count={5} className="notification-badge">
            <BellOutlined style={{ color: "#fff" }} />
          </Badge>
          <Button type="text" style={{ color: "#fff" }}>
            <UserOutlined style={{ color: "#fff" }} />
            {isAuthenticated ? user.name : "Login"}
          </Button>
          <Button
            type="text"
            style={{ color: "#fff" }}
            onClick={() => {
              logout({
                logoutParams: { returnTo: "https://pn7mww-3000.csb.app/" },
              });
            }}
          >
            Logout
          </Button>
          {/* <Dropdown overlay={menu}>
            <Button type="text" style={{ color: "#fff" }}>
              XA <DownOutlined />
            </Button>
          </Dropdown> */}
        </Space>
      </div>
    </Header>
  );
};

export default IndusunoHeader;
