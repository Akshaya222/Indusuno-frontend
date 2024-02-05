import React from "react";
import "../styles.css";
import { Progress, Button, Space, Flex, Table, Layout, theme } from "antd";
const { Content } = Layout;

const Sync = () => {
  const data = [
    {
      key: 1,
      accountId: "12345",
      date: "12/03/2024 11:10 AM",
      totalSkus: 100,
      progressValue: 50,
      status: "",
    },
    {
      key: 2,
      accountId: "67890",
      date: "23/05/2023 09:12 AM",
      totalSkus: 2000,
      progressValue: 100,
      status: "",
    },
    {
      key: 3,
      accountId: "67840",
      date: "11/01/2024 02:12 PM",
      totalSkus: 10000,
      progressValue: 100,
      status: "",
    },
    {
      key: 4,
      accountId: "67320",
      date: "13/01/2024 07:12 PM",
      totalSkus: 50000,
      progressValue: 100,
      status: "exception",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "accountId",
      key: "accountId",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
    },
    {
      title: "Total SKUs",
      dataIndex: "totalSkus",
      key: "totalSkus",
      width: 100,
    },
    {
      title: "Sync Status",
      dataIndex: "progressValue",
      key: "progressValue",
      render: (progressValue, record) => (
        // <div style={{ display: "flex", alignItems: "center" }}>
        //   <Progress percent={progressValue} size="small" showInfo={false} />
        //   <span style={{ marginLeft: 3 }}>{record.sourcingStatus}</span>
        // </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Progress
            percent={progressValue}
            size="small"
            status={record.status}
          />
        </div>
      ),
      width: 220,
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.status && <span>Something went wrong.Duplicate SKUs</span>}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button>Re Sync</Button>
        </Space>
      ),
    },
  ];
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 400,
        borderRadius: borderRadiusLG,
        position: "relative", // To allow absolute positioning within Content
      }}
    >
      <Flex
        justify="flex-end"
        style={{
          width: "100%",
          paddingBottom: "14px",
        }}
      >
        <Button style={{ marginLeft: "15px" }}>Sync Now</Button>
      </Flex>
      <Space>
        <Table
          columns={columns}
          dataSource={data}
          pagination={true}
          scroll={{ y: 500 }}
        />
      </Space>
    </Content>
  );
};

export default Sync;
