import React, { useState, useEffect, useMemo } from "react";
import { Select, Card, Row, Col, Button, Pagination } from "antd";

const { Option } = Select;

// Helper function to get a random option from an array
const getRandomOption = (options) =>
  options[Math.floor(Math.random() * options.length)];

const generateDummyData = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    brand: getRandomOption(["nyka", "meesho", "Myntra"]),
    colour: getRandomOption(["red", "blue", "pink"]),
    weight: getRandomOption(["2kg", "5kg", "3kg"]),
  }));
};

const DynamicFilterList = () => {
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

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Memoized dummy data
  const dummyData = useMemo(() => generateDummyData(), []);

  useEffect(() => {
    // Simulating API call to fetch dynamic filter data from the backend
    // Replace this with your actual API call
    const fetchDataFromBackend = async () => {
      // Fetch data from your API endpoint
      // For demonstration, I'm using a static data object
      const response = {
        Brands: ["nyka", "meesho", "Myntra"],
        Colours: ["red", "blue", "pink"],
        Weight: ["2kg", "5kg", "3kg"],
      };

      setFilterData(response);
    };

    fetchDataFromBackend();
  }, []);

  useEffect(() => {
    // Apply real-time filtering whenever filters change
    const filteredData = dummyData.filter((product) => {
      return (
        (!selectedFilters.Brands.length ||
          selectedFilters.Brands.includes(product.brand)) &&
        (!selectedFilters.Colours.length ||
          selectedFilters.Colours.includes(product.colour)) &&
        (!selectedFilters.Weight.length ||
          selectedFilters.Weight.includes(product.weight))
      );
    });

    setFilteredData(filteredData);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [selectedFilters, dummyData]);

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: values,
    });
  };
  const handlePageChange = (page) => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (page < 1 || page > totalPages) {
      return; // Ignore invalid page changes
    }

    setCurrentPage(page);
  };

  const renderFilteredItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log("filteredarray is ..", filteredData);
    const slicedData =
      Array.isArray(filteredData) &&
      startIndex >= 0 &&
      endIndex <= filteredData.length
        ? filteredData.slice(startIndex, endIndex)
        : [];

    return (
      <Row gutter={16}>
        {slicedData.map((item) => (
          <Col key={item.id} span={8}>
            <Card title={item.name} style={{ marginBottom: "16px" }}>
              <p>Brand: {item.brand}</p>
              <p>Colour: {item.colour}</p>
              <p>Weight: {item.weight}</p>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderCreateNewItemBox = () => (
    <Col span={8}>
      <Card style={{ marginBottom: "16px", textAlign: "center" }}>
        <Button type="primary" onClick={() => alert("Create New Item")}>
          Create New Item
        </Button>
      </Card>
    </Col>
  );

  const renderPagination = () => {
    return (
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={filteredData.length}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    );
  };

  return (
    <div>
      {Object.keys(filterData).map((filterType) => (
        <div key={filterType} style={{ margin: "10px" }}>
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
      {filteredData.length > 0 ? (
        <>
          {currentPage === 1
            ? // Display first 3 items on the first page
              renderFilteredItems()
            : // Display remaining items on subsequent pages
              renderFilteredItems().slice(itemsPerPage)}
        </>
      ) : (
        <Col span={24}>
          <Card>No matching items found. Try adjusting your filters.</Card>
        </Col>
      )}
      {renderCreateNewItemBox()}
      {filteredData.length > itemsPerPage && renderPagination()}
    </div>
  );
};

export default DynamicFilterList;
