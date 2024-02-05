import React from "react";
import { Layout, Menu, Table } from "antd";
import { Space } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Header from "./Header";

const { Sider, Content } = Layout;

const IndusunoDashboard = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const columns = [
    {
      title: "Account ID",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total SKUs",
      dataIndex: "totalSkus",
      key: "totalSkus",
    },
    {
      title: "Sourcing Status",
      dataIndex: "sourcingStatus",
      key: "sourcingStatus",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button>Start Sourcing</button>
          <button>Create a Purchase Query</button>
          <button>Syncing With Kissflow</button>
          <button>Push to Kissflow</button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      accountId: "12345",
      source: "Website",
      description: "Query for 30 products in electronics cat from Mahindra",
      totalSkus: 100,
      sourcingStatus: "50/100",
    },
    // ... add more data objects here
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              User
            </Menu.Item>
            <Menu.Item key="2" icon={<LaptopOutlined />}>
              Products
            </Menu.Item>
            <Menu.Item key="3" icon={<NotificationOutlined />}>
              Notifications
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <h1>Indusuno Dashboard</h1>
            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default IndusunoDashboard;
