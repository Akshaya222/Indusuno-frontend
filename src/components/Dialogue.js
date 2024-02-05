import React from "react";
import { Modal, Button, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../styles.css"; // Import a CSS file for styling
import PropTypes from "prop-types";

const MyComponent = ({ isModalVisible, setIsModalVisible, setValues }) => {
  const [form] = Form.useForm(); // Use Form Hooks to manage the form instance

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    // Handle form submission here
    setValues(values);
    console.log("Form submitted:", values);
    // You can add your logic for form submission, like sending data to a server
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields
  };

  const beforeUpload = (file) => {
    const isExcel =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      message.error("You can only upload Excel files!");
    }
    return isExcel;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadProps = {
    beforeUpload: beforeUpload,
    showUploadList: { showRemoveIcon: false },
  };

  return (
    <div>
      <Modal
        title="Create a Purchase Query"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={null}
        centered // Center the modal on the screen
        className="custom-modal" // Apply custom CSS class
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="purchase-form"
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Source"
                name="source"
                rules={[
                  { required: true, message: "Please enter the source!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Customer"
                name="customer"
                rules={[
                  { required: true, message: "Please enter the customer!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter the description!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Total SKUs"
                name="totalSKUs"
                rules={[
                  { required: true, message: "Please enter the total SKUs!" },
                  {
                    pattern: /^[0-9]*$/,
                    message: "Please enter a valid number for Total SKUs!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Upload File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload Excel</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <div className="center">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyComponent;

MyComponent.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  setValues: PropTypes.func,
};
