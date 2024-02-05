import React, { useState, useEffect } from "react";
import { Input, Select, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import hammerImage from "./hammer.webp";

const { Option } = Select;

const Search = () => {
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
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Input
        placeholder="Product Name or SKU or Material Code"
        style={{
          width: "300px",
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((imageNumber) => (
              <Col
                key={imageNumber}
                span={6}
                style={{
                  textAlign: "center",
                  marginBottom: "16px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "200px", // Increased height
                    width: "160px", // Reduced width
                    border:
                      selectedImage === imageNumber
                        ? "1px solid red"
                        : "1px solid #dadada",
                    borderRadius: "2px",
                    cursor: "pointer",
                    padding: "4px", // Add padding to the image container
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
                      height: "80%", // Adjusted height
                      objectFit: "cover",
                    }}
                  />
                  {/* Text taking up 20% */}
                  <div style={{ height: "20%", textAlign: "left" }}>
                    <h2 style={{ fontSize: "8px", margin: "0" }}>python</h2>
                    <p style={{ fontSize: "5px", margin: "0" }}>
                      python 680 forged steel sledged hammer head without handle
                      45396835768
                    </p>
                    <p style={{ fontSize: "4px", margin: "0" }}>hammer</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Search;
