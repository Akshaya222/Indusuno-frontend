import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Col, Row } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import hammerImage from "./hammer.webp";
import CreateSKUDialogue from "./CreateSKUDialogue";

const { Option } = Select;

const SearchDialog = ({ enableSearch, setEnableSearch }) => {
  const [createSku, setCreateSku] = useState(false);
  const [values, setValues] = useState({});
  console.log("create sku ", values);
  const handleCancel = () => {
    setEnableSearch(false);
  };

  const [filterData, setFilterData] = useState({
    Brands: [],
    Colours: [],
    Weight: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    Brands: [],
    Colours: [],
    Weight: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      const response = {
        Brands: ["nyka", "meesho", "Myntra"],
        Colours: ["red", "blue", "pink"],
        Weight: ["2kg", "5kg", "3kg"],
      };
      setFilterData(response);
    };

    fetchDataFromBackend();
  }, []);

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: values,
    });
  };

  const handleImageClick = (imageNumber) => {
    console.log(`Details of Image ${imageNumber}`);
  };

  return (
    <div>
      <Modal
        visible={enableSearch}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "60px",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
        width="80%" // Set the width as needed
      >
        <Input
          placeholder="Product Name or SKU or Material Code"
          style={{
            width: "200px",
            textAlign: "center",
            margin: "20px",
          }}
          suffix={<SearchOutlined />}
        />
        <Row gutter={[16, 16]}>
          <Col span={6}>
            {Object.keys(filterData).map((filterType) => (
              <div key={filterType} style={{ marginBottom: "10px" }}>
                <Select
                  mode={filterType === "Colours" ? "tags" : "multiple"}
                  style={{ width: "100%" }}
                  placeholder={`Select ${filterType}`}
                  value={selectedFilters[filterType]}
                  onChange={(values) => handleFilterChange(filterType, values)}
                >
                  {filterData[filterType].map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </div>
            ))}
          </Col>

          <Col span={18}>
            <Row gutter={[16, 16]}>
              {[1, 2, 3, 4].map((imageNumber) => (
                <Col
                  key={imageNumber}
                  span={4}
                  style={{
                    textAlign: "center",
                    marginLeft: "15px", // Apply margin to create spacing between each Col item
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "170px",
                      width: "140px",
                      border:
                        selectedImage === imageNumber
                          ? "1px solid red"
                          : "1px solid #dadada",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleImageClick(imageNumber);
                      setSelectedImage(imageNumber);
                    }}
                  >
                    {/* Image taking up 80% */}
                    <img
                      src={hammerImage}
                      alt={`Image ${imageNumber}`}
                      style={{
                        width: "100%",
                        height: "75%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Text taking up 20% */}
                    <div style={{ height: "25%", textAlign: "left" }}>
                      <h2 style={{ fontSize: "8px", margin: "0" }}>python</h2>
                      <p style={{ fontSize: "5px", margin: "0" }}>
                        python 680 forged steel sledged hammer head without
                        handle 45396835768
                      </p>
                      <p style={{ fontSize: "4px", margin: "0" }}>hammer</p>
                    </div>
                  </div>
                </Col>
              ))}
              <CreateSKUDialogue
                createSku={createSku}
                setCreateSku={setCreateSku}
                setValues={setValues}
                setEnableSearch={setEnableSearch}
              />
              <Col span={4} style={{ textAlign: "center", marginLeft: "15px" }}>
                {/* Button with dotted borders */}
                <button
                  style={{
                    width: "140px",
                    height: "170px",
                    border: "1px dotted black",
                    backgroundColor: "#dadada",
                  }}
                  onClick={() => setCreateSku(true)}
                >
                  Create a new SKU
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

SearchDialog.propTypes = {
  setEnableSearch: PropTypes.func,
  enableSearch: PropTypes.bool,
};

export default SearchDialog;
