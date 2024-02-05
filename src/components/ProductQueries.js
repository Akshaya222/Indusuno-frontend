import React, { useState, useEffect } from "react";
import "../styles.css";
import {
  Progress,
  Button,
  Space,
  Flex,
  Table,
  Layout,
  theme,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
const { Content } = Layout;
const { Search } = Input;
import Dialogue from "./Dialogue";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const ProductList = ({ setClickItem }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [token, setToken] = useState(null);
  console.log("values..", values);
  const { getAccessTokenSilently } = useAuth0();

  const handleGetToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      console.log("Access Token:", accessToken);

      // Now you can pass the accessToken to your backend
      // (e.g., send it in the Authorization header of API requests)
    } catch (error) {
      console.error("Error getting access token:", error);
    }
  };

  const retrivePurchaseQueries = async () => {
    console.log("token", token);
    try {
      const response = await axios.get(
        "http://34.131.30.15:5004/PurchaseQueries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetToken();
    retrivePurchaseQueries();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
    handleSearch();
  };
  const handleSearch = () => {
    console.log("searchValue..", searchValue);
    // Implement your logic to filter the table data based on the search value
    // For simplicity, let's assume 'source' is the key to filter on
    const filteredData = data.filter((item) =>
      item.source.toLowerCase().includes(searchValue.toLowerCase()),
    );
    // Update the table data with the filtered data
    // You might want to use state for this in a real application
    setFilteredData(filteredData);
    console.log(filteredData);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const data = [
    {
      key: 1,
      accountId: "12345",
      source: "Website",
      description: "Query for 30 products in electronics cat from Mahindra",
      totalSkus: 100,
      sourcingStatus: "50/100",
      progressValue: 50,
      pushToKissflow: true,
    },
    {
      key: 2,
      accountId: "67890",
      source: "Email",
      description: "Query for 20 products in fashion cat from Puma",
      totalSkus: 100,
      sourcingStatus: "100/100",
      progressValue: 100,
      pushToKissflow: false,
    },
    {
      key: 3,
      accountId: "67840",
      source: "Website",
      description: "Query for 20 products in fashion cat from Puma",
      totalSkus: 75,
      sourcingStatus: "50/75",
      progressValue: 66,
      pushToKissflow: true,
    },
    {
      key: 4,
      accountId: "67320",
      source: "Website",
      description: "Query for 20 products in fashion cat from Puma",
      totalSkus: 100,
      sourcingStatus: "100/100",
      progressValue: 100,
      pushToKissflow: true,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "accountId",
      key: "accountId",
      width: 100,
      onCell: (record) => {
        return {
          onClick: () => handleCellClick(record),
        };
      },
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 120,
      onCell: (record) => {
        return {
          onClick: () => handleCellClick(record),
        };
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      onCell: (record) => {
        return {
          onClick: () => handleCellClick(record),
        };
      },
    },
    {
      title: "Total SKUs",
      dataIndex: "totalSkus",
      key: "totalSkus",
      width: 150,
      align: "center",
      onCell: (record) => {
        return {
          onClick: () => handleCellClick(record),
        };
      },
    },
    {
      title: "Sourcing Status",
      dataIndex: "progressValue",
      key: "progressValue",
      render: (progressValue) => (
        // <div style={{ display: "flex", alignItems: "center" }}>
        //   <Progress percent={progressValue} size="small" showInfo={false} />
        //   <span style={{ marginLeft: 3 }}>{record.sourcingStatus}</span>
        // </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Progress percent={progressValue} size="small" />
        </div>
      ),
      width: 220,
      onCell: (record) => {
        return {
          onClick: () => handleCellClick(record),
        };
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.pushToKissflow ? (
            <Button disabled={record.progressValue !== 100} type="primary">
              Push to Kissflow
            </Button>
          ) : (
            <Button disabled={record.progressValue !== 100} type="primary">
              Syncing with Kissflow
            </Button>
          )}
        </Space>
      ),
      onCell: (record) => {
        return {
          onClick: () => handleCellClick(record),
        };
      },
    },
  ];
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const handleCellClick = (record) => {
    // Handle click event on a cell
    console.log("Clicked on cell:", record);
    setClickItem("SKU");
    // Add your logic or actions here
  };
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
        <Space style={{ marginBottom: "10px" }}>
          <Search
            placeholder="Search by source"
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleEnterKeyPress}
            enterButton={
              <Button
                type="primary"
                onClick={handleSearch}
                icon={<SearchOutlined />}
              />
            }
          />
        </Space>
        <Button style={{ marginLeft: "15px" }} onClick={showModal}>
          Create a Purchase Query
        </Button>
      </Flex>
      <Space>
        <Dialogue
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setValues={setValues}
        />
        <Table
          columns={columns}
          dataSource={filteredData || data}
          pagination={true}
          scroll={{ y: 500 }}
        />
      </Space>
    </Content>
  );
};

export default ProductList;

ProductList.propTypes = {
  setClickItem: PropTypes.func,
};
