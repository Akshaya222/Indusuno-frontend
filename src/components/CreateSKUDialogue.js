import React from "react";
import { Modal, Button, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../styles.css"; // Import a CSS file for styling
import PropTypes from "prop-types";

const CreateSKU = ({ createSku, setCreateSku, setValues, setEnableSearch }) => {
  const [form] = Form.useForm(); // Use Form Hooks to manage the form instance

  const handleCancel = () => {
    setCreateSku(false);
  };

  const onFinish = (values) => {
    // Handle form submission here
    setValues(values);
    console.log("Form submitted:", values);
    // You can add your logic for form submission, like sending data to a server
    setCreateSku(false);
    form.resetFields(); // Reset form fields
    setTimeout(() => {
      setEnableSearch(false);
    }, 1000);
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
        title="Create SKU"
        visible={createSku}
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
                label="Material Code"
                name="materialCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Material Code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SKU"
                name="sku"
                rules={[{ required: true, message: "Please enter the SKU!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Please enter the Product Name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Product Description"
                name="productDescription"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Product Description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please enter the Category!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sub Category"
                name="subCategory"
                rules={[
                  { required: true, message: "Please enter the Sub Category!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: "Please enter the Brand!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Model Number"
                name="modelNumber"
                rules={[
                  { required: true, message: "Please enter the Model Number!" },
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

export default CreateSKU;

CreateSKU.propTypes = {
  createSku: PropTypes.bool,
  setCreateSku: PropTypes.func,
  setValues: PropTypes.func,
  setEnableSearch: PropTypes.func,
};
