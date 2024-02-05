import React, { useState } from "react";
import {
  DashboardOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Header from "./Header";
import { Layout, Menu, theme } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;
import SKU from "./SKU";
import PurchaseQueries from "./ProductQueries";
import Sync from "./Sync";
import Search from "./Search";

const items2 = [DashboardOutlined, CheckCircleOutlined, UserOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    const customLabels = ["Dashboard", "Master SKU", "Account"];
    const customLabel = customLabels[index];
    const item = {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: customLabel,
    };
    // Only add children for the first item
    if (index === 0) {
      const customLabels1 = ["Purchase Queries", "Completed"];
      item.children = new Array(2).fill(null).map((_, j) => {
        const subKey = customLabels1[j];
        return {
          key: subKey,
          label: subKey,
        };
      });
    }
    if (index === 1) {
      const customLabels2 = ["Sync", "Search", "Group", "Database"];
      item.children = new Array(4).fill(null).map((_, j) => {
        const subKey = customLabels2[j];
        return {
          key: subKey,
          label: subKey,
        };
      });
    }

    return item;
  },
);

const Rayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [clickItem, setClickItem] = useState("Purchase Queries");

  const handleItemClick = (item) => {
    // Handle click event for the menu item
    console.log("Clicked on item:", item);
    if (item.key == "Sync") {
      setClickItem("Sync");
    } else if (item.key == "Search") {
      setClickItem("Search");
    } else {
      setClickItem("Purchase Queries");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            textAlign: "left",
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["Purchase Queries"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
          >
            {items2.map((item) =>
              item.children ? (
                <SubMenu key={item.key} title={item.label} icon={item.icon}>
                  {item.children.map((child) => (
                    <Menu.Item
                      key={child.key}
                      onClick={() => handleItemClick(child)}
                    >
                      {child.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </Menu.Item>
              ),
            )}
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          {clickItem == "Sync" ? (
            <Sync />
          ) : clickItem == "SKU" ? (
            <SKU />
          ) : clickItem == "Search" ? (
            <Search />
          ) : (
            <PurchaseQueries setClickItem={setClickItem} />
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Rayout;
