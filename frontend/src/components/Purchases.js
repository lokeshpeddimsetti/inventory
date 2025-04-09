import React, { useState } from "react";
import { Form, Input, Button, message, DatePicker, Upload, Table } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const Purchases = () => {
  const [cart, setCart] = useState([]); // Track items in the cart
  const [invoiceFile, setInvoiceFile] = useState(null); // Track the uploaded invoice file
  const [loading, setLoading] = useState(false);
  const [billNo, setBillNo] = useState(null); // Track the generated bill number

  // Handle adding an item to the cart
  const handleAddItem = (values) => {
    console.log("Adding item to cart:", values); // Debugging log

    // Check for duplicate items
    const isDuplicate = cart.some((item) => item.item_name === values.item_name);
    if (isDuplicate) {
      message.error("This item is already in the cart.");
      return;
    }

    setCart((prev) => [...prev, values]);
    message.success("Item added to cart!");
  };

  // Handle file upload
  const handleFileChange = (info) => {
    if (info.file && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInvoiceFile(e.target.result); // Convert file to base64
        console.log("Invoice file uploaded:", e.target.result); // Debugging log
      };
      reader.readAsDataURL(info.file.originFileObj);
    } else {
      message.error("Failed to upload the invoice. Please try again.");
    }
  };

  // Handle submitting the purchase
  const handleAddPurchase = async (values) => {
    console.log("Form values:", values); // Debugging log
    console.log("Cart items:", cart); // Debugging log
    console.log("Invoice file:", invoiceFile); // Debugging log

    if (cart.length === 0) {
      message.error("Please add at least one item to the cart.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        supplier_id: values.supplier_id,
        purchase_date: values.purchase_date.format("YYYY-MM-DD"),
        invoice: invoiceFile,
        items: cart, // Cart already includes domain and category_name
      };
      console.log("Payload being sent to backend:", payload); // Debugging log

      const response = await axios.post("http://localhost:5000/purchases", payload);

      if (response.data.success) {
        message.success(`Purchase added successfully! Bill Number: ${response.data.bill_no}`);
        setBillNo(response.data.bill_no); // Set the generated bill number
        setCart([]); // Clear the cart
        setInvoiceFile(null); // Clear the invoice file
      } else {
        message.error("Failed to add purchase. Please try again.");
      }
    } catch (error) {
      console.error("Error adding purchase:", error);
      message.error("Failed to add purchase. Please try again later.");
    }
    setLoading(false);
  };

  // Columns for the cart table
  const cartColumns = [
    { title: "Item Name", dataIndex: "item_name", key: "item_name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Unit Price", dataIndex: "unit_price", key: "unit_price" },
    { title: "Category", dataIndex: "category_name", key: "category_name" },
    { title: "Domain", dataIndex: "domain", key: "domain" }, // Add domain column
    {
      title: "Total Cost",
      key: "total_cost",
      render: (_, record) => <span>{(record.quantity * record.unit_price).toFixed(2)}</span>,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Purchase</h2>

      {/* Cart Management Section */}
      <h3>Manage Cart</h3>
      <Form
        layout="vertical"
        onFinish={handleAddItem}
        style={{ maxWidth: 600, marginBottom: 20 }}
      >
        <Form.Item
          label="Item Name"
          name="item_name"
          rules={[{ required: true, message: "Please enter the item name" }]}
        >
          <Input placeholder="Enter item name" />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity" }]}
        >
          <Input type="number" placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item
          label="Unit Price"
          name="unit_price"
          rules={[{ required: true, message: "Please enter the unit price" }]}
        >
          <Input type="number" placeholder="Enter unit price" />
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter the brand" }]}
        >
          <Input placeholder="Enter brand" />
        </Form.Item>
        <Form.Item
          label="Category Name"
          name="category_name"
          rules={[{ required: true, message: "Please enter the category name" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item
          label="Domain"
          name="domain"
          rules={[{ required: true, message: "Please enter the domain" }]}
        >
          <Input placeholder="Enter domain" />
        </Form.Item>

        <Form.Item>
          <Button type="dashed" icon={<PlusOutlined />} htmlType="submit">
            Add Item to Cart
          </Button>
        </Form.Item>
      </Form>

      {/* Cart Table */}
      <h3>Cart</h3>
      <Table
        dataSource={cart}
        columns={cartColumns}
        rowKey={(record, index) => `${record.item_name}-${index}`} // Ensure unique keys
        pagination={false}
        style={{ marginBottom: 20 }}
      />

      {/* Purchase Submission Section */}
      <h3>Submit Purchase</h3>
      <Form
        layout="vertical"
        onFinish={handleAddPurchase}
        style={{ maxWidth: 600 }}
      >
        {/* Display Bill Number */}
        {billNo && (
          <Form.Item label="Bill Number">
            <Input value={billNo} readOnly />
          </Form.Item>
        )}

        {/* Common Fields */}
        <Form.Item
          label="Supplier ID"
          name="supplier_id"
          rules={[{ required: true, message: "Please enter the supplier ID" }]}
        >
          <Input placeholder="Enter supplier ID" />
        </Form.Item>
        <Form.Item
          label="Purchase Date"
          name="purchase_date"
          rules={[{ required: true, message: "Please select the purchase date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Invoice Upload */}
        <Form.Item
          label="Invoice"
          rules={[{ required: true, message: "Please upload the invoice" }]}
        >
          <Upload
            accept=".pdf,.jpg,.png"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload Invoice</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Purchase
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Purchases;