import React, { useState } from "react";
import { Input, Space, theme, Layout, Table, Image, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Content } = Layout;
import SearchDialouge from "./SearchDialogue";
import hammerImage from "./hammer.webp";

const SKU = () => {
  const [inputValues, setInputValues] = useState({});
  const [enableSearch, setEnableSearch] = useState(false);
  const [showImageDetails, setShowImageDetails] = useState(false);
  const handleImageDetailsClick = (index) => {
    setShowImageDetails(true);
    console.log("clicked on image index..", index);
  };
  const cancelShowImageDetails = () => {
    setShowImageDetails(false);
  };
  const [data] = useState([
    {
      key: 1,
      material: "Material",
      code: "code",
      description: "Product Description",
      category: "Category",
      subCategory: "Sub Category",
      brand: "Brand",
      matches: "Matches",
      attributes: "attributes",
      dimension: "dimension",
      weight: "weight",
      status: "pending",
    },
    {
      key: 2,
      material: "Material",
      code: "code",
      description: "Product Description",
      category: "Category",
      subCategory: "Sub Category",
      brand: "Brand",
      matches: "Matches",
      attributes: "attributes",
      dimension: "dimension",
      weight: "weight",
      status: "completed",
    },
    {
      key: 3,
      material: "Material",
      code: "code",
      description: "Product Description",
      category: "Category",
      subCategory: "Sub Category",
      brand: "Brand",
      matches: "Matches",
      attributes: "attributes",
      dimension: "dimension",
      weight: "weight",
      status: "skipped",
    },
    {
      key: 4,
      material: "Material",
      code: "code",
      description: "Product Description",
      category: "Category",
      subCategory: "Sub Category",
      brand: "Brand",
      matches: "Matches",
      attributes: "attributes",
      dimension: "dimension",
      weight: "weight",
      status: "pending",
    },
    {
      key: 5,
      material: "Material",
      code: "code",
      description: "Product Description",
      category: "Category",
      subCategory: "Sub Category",
      brand: "Brand",
      matches: "Matches",
      attributes: "attributes",
      dimension: "dimension",
      weight: "weight",
      status: "pending",
    },
  ]);

  const [columns] = useState([
    {
      title: "Indusuno SKU",
      dataIndex: "sku",
      key: "sku",
      render: (_, record) => (
        <Input
          placeholder="SKU"
          suffix={
            <SearchOutlined
              onClick={() => handleSearchClick("sku", record.sku, record)}
            />
          }
          onChange={(e) => handleInputChange("sku", e.target.value, record)}
        />
      ),
      width: 150,
    },
    {
      title: "Materical Code",
      dataIndex: "materialCode",
      key: "materialCode",
      width: 150,
      render: (_, record) => (
        <Input
          placeholder="Material Code"
          suffix={
            <SearchOutlined
              onClick={() =>
                handleSearchClick("materialCode", record.materialCode, record)
              }
            />
          }
          onChange={(e) =>
            handleInputChange("materialCode", e.target.value, record)
          }
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 160,
      render: (_, record) => (
        <Input
          placeholder="Product Name"
          suffix={
            <SearchOutlined
              onClick={() =>
                handleSearchClick("productName", record.productName, record)
              }
            />
          }
          onChange={(e) =>
            handleInputChange("productName", e.target.value, record)
          }
        />
      ),
    },
    {
      title: "Product Description",
      dataIndex: "description",
      key: "description",
      width: 250,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: () => (
        <div style={{ display: "flex" }}>
          <Image
            src={hammerImage}
            height={140}
            width={140} // Set the width as needed
          />
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Attributes",
      dataIndex: "attributes",
      key: "attributes",
      width: 210,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 150,
    },
    {
      title: "Model No",
      dataIndex: "modelNo",
      key: "modelNo",
      width: 150,
      render: (_, record) => (
        <Input
          placeholder="Model No"
          suffix={
            <SearchOutlined
              onClick={() =>
                handleSearchClick("modelNo", record.modelNo, record)
              }
            />
          }
          onChange={(e) => handleInputChange("modelNo", e.target.value, record)}
        />
      ),
    },
    {
      title: "Item Dimension",
      dataIndex: "dimension",
      key: "dimension",
      width: 150,
    },
    {
      title: "Item Weight",
      dataIndex: "weight",
      key: "weight",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "Matches",
      dataIndex: "matches",
      key: "matches",
      width: 500,
      render: () => (
        <div style={{ display: "flex" }}>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                position: "relative",
                marginRight: "5px",
                height: "140px",
                width: "140px",
              }}
            >
              <Image
                src={hammerImage}
                alt={`Image ${index}`}
                height={110}
                width={120} // Set the width as needed
              />
              <button
                style={{
                  position: "absolute",
                  top: "6",
                  right: "3",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: "grey",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                onClick={() => handleImageDetailsClick(index)}
              >
                {/* Add your clickable button content, e.g., "i" for information */}
                i
              </button>
              <div>
                <p style={{ fontSize: "10px", margin: "0" }}>python</p>
                <p style={{ fontSize: "7px", margin: "0" }}>
                  Description for Image, Description for Image...
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]);

  const [pagination, setPagination] = useState({
    pageSize: 3, // Set the number of rows per page
    current: 1,
    total: data.length, // Set the total number of items
  });

  // Handle table change, including pagination changes
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
    });
  };

  const handleInputChange = (key, value, record) => {
    // Handle input change event, you can use this function to update state if needed
    setInputValues((prevValues) => ({
      ...prevValues,
      [`${key}-${record.key}`]: value,
    }));
    console.log(`Input with key ${key} changed to: ${value}`);
  };
  const handleSearchClick = (key, value, record) => {
    //const inputValue = inputValues[`${key}-${record.key}`];
    console.log(
      `Search icon clicked for input with key ${key}, value: ${JSON.stringify(inputValues)}`,
    );
    console.log("Row details:", record);
    setEnableSearch(true);
  };

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
        position: "relative",
      }}
    >
      <Space
        style={{
          width: "100%",
        }}
      >
        <SearchDialouge
          enableSearch={enableSearch}
          setEnableSearch={setEnableSearch}
        />
        <Modal
          visible={showImageDetails}
          onCancel={cancelShowImageDetails}
          footer={null}
          centered
          style={{
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
          width="40%" // Set the width as needed
        >
          <div>
            <Image src={hammerImage} alt="Hammer" width={200} />
            <p style={{ fontSize: "12px", margin: "0" }}>Python</p>
            <p style={{ fontSize: "10px", margin: "0" }}>
              {" "}
              python 680 forged steel sledged hammer head without handle
              45396835768
            </p>
            <p style={{ fontSize: "8px", margin: "0" }}>hammer</p>
          </div>
        </Modal>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination} // Use the pagination state
          onChange={handleTableChange} // Handle table change event
          style={{
            maxWidth: "1100px",
            overflowX: "auto",
          }}
          scroll={{ x: "max-content", y: 500 }}
          // components={{
          //   header: {
          //     cell: (props) => (
          //       <th
          //         {...props}
          //         style={{
          //           background: "#001529", // Dark blue background color
          //           color: "white", // Text color
          //           fontWeight: "bold",
          //           border: "none", // Remove border
          //         }}
          //       />
          //     ),
          //   },
          // }}
        />
      </Space>
    </Content>
  );
};
export default SKU;
