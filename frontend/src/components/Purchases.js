import React, { useState } from "react";
import { Form, Input, Button, message, DatePicker } from "antd";
import axios from "axios";

const Purchases = ({ setItemsData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleAddPurchase = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/purchases", {
        item_name: values.item_name,
        supplier_id: values.supplier_id,
        purchase_date: values.purchase_date.format("YYYY-MM-DD"),
        quantity: values.quantity,
        unit_price: values.unit_price,
      });

      if (response.data.success) {
        message.success("Purchase added successfully!");

        // Optionally, update the items table in the frontend
        if (setItemsData) {
          setItemsData((prev) =>
            prev.map((item) =>
              item.name === values.item_name
                ? {
                    ...item,
                    quantity: item.quantity + values.quantity,
                    unit_price: values.unit_price, // Update unit price
                  }
                : item
            )
          );
        }

        form.resetFields(); // Reset the form
      } else {
        message.error("Failed to add purchase. Please try again.");
      }
    } catch (error) {
      console.error("Error adding purchase:", error);
      message.error("Failed to add purchase. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Purchase</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddPurchase}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          label="Item Name"
          name="item_name"
          rules={[{ required: true, message: "Please enter the item name" }]}
        >
          <Input placeholder="Enter item name" />
        </Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Purchase
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Purchases;