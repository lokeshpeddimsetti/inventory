import React, { useState } from "react";
import { Input, Button, Modal, message } from "antd";
import axios from "axios";

const ItemsTable = ({ itemsData, setItemsData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility
  const [modalData, setModalData] = useState({}); // Track data for issuing an item
  const [issueQuantity, setIssueQuantity] = useState(""); // Track the quantity to be issued
  const [issuedTo, setIssuedTo] = useState(""); // Track the person to whom the item is issued
  const [issuedBy, setIssuedBy] = useState(localStorage.getItem("username") || "Unknown User"); // Track the person issuing the item
  const [editingRow, setEditingRow] = useState(null); // Track the row being edited
  const [updatedRow, setUpdatedRow] = useState({}); // Track the updated row data

  // Handle Issue button click
  const handleIssue = (item) => {
    setModalData(item); // Set the item data for the modal
    setIssueQuantity(""); // Reset the issue quantity
    setIssuedTo(""); // Reset the issuedTo field
    setIssuedBy(localStorage.getItem("username") || "Unknown User"); // Reset the issuedBy field
    setIsModalVisible(true); // Show the modal
  };

  // Handle Modal OK button click
  const handleModalOk = async () => {
    if (!issueQuantity || issueQuantity <= 0) {
      message.error("Please enter a valid quantity to issue.");
      return;
    }

    if (issueQuantity > modalData.quantity) {
      message.error("Issued quantity cannot exceed available quantity.");
      return;
    }

    if (!issuedTo.trim()) {
      message.error("Please specify the person to whom the item is issued.");
      return;
    }

    if (!issuedBy.trim()) {
      message.error("Please specify the issuer name.");
      return;
    }

    try {
      // Log the payload for debugging
      console.log({
        item: modalData.name,
        quantity: issueQuantity,
        issued_by: issuedBy,
        issue_date: new Date().toISOString().split("T")[0],
        issued_to: issuedTo,
      });

      // Send the issued item data to the backend
      const response = await axios.post("http://localhost:5000/issued-items", {
        item: modalData.name,
        quantity: issueQuantity,
        issued_by: issuedBy,
        issue_date: new Date().toISOString().split("T")[0],
        issued_to: issuedTo,
      });

      if (response.data.success) {
        message.success("Item issued successfully!");

        // Update the quantity in the itemsData state
        setItemsData((prev) =>
          prev.map((item) =>
            item.id === modalData.id
              ? { ...item, quantity: item.quantity - issueQuantity }
              : item
          )
        );

        setIsModalVisible(false); // Close the modal
      } else {
        message.error("Failed to issue item. Please try again.");
      }
    } catch (error) {
      console.error("Error issuing item:", error);
      message.error("Failed to issue item. Please try again later.");
    }
  };

  // Handle Modal Cancel button click
  const handleModalCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  // Handle Modify button click
  const handleModify = (item) => {
    setEditingRow(item.id); // Set the row being edited
    setUpdatedRow(item); // Set the initial data for the row being edited
  };

  // Handle Save button click
  const handleSave = async () => {
    try {
      // Send the updated row data to the backend
      const response = await axios.put(`http://localhost:5000/items/${editingRow}`, updatedRow);
      if (response.data.success) {
        message.success("Item updated successfully!");
        // Update the itemsData state with the modified row
        setItemsData((prev) =>
          prev.map((item) => (item.id === editingRow ? { ...item, ...updatedRow } : item))
        );
        setEditingRow(null); // Exit editing mode
        setUpdatedRow({});
      } else {
        message.error("Failed to update item. Please try again.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      message.error("Failed to update item. Please try again later.");
    }
  };

  // Handle Cancel button click for editing
  const handleCancelEdit = () => {
    setEditingRow(null); // Exit editing mode without saving
    setUpdatedRow({});
  };

  return (
    <div>
      <h2>Items</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Category Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Brand</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Supplier ID</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Quantity</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Units</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Unit Price</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Total Price</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Domain</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {itemsData.map((item) => (
            <tr key={item.id}>
              {editingRow === item.id ? (
                <>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.name}
                      onChange={(e) => setUpdatedRow({ ...updatedRow, name: e.target.value })}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.category_name}
                      onChange={(e) =>
                        setUpdatedRow({ ...updatedRow, category_name: e.target.value })
                      }
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.brand}
                      onChange={(e) => setUpdatedRow({ ...updatedRow, brand: e.target.value })}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.supplier_id}
                      onChange={(e) =>
                        setUpdatedRow({ ...updatedRow, supplier_id: e.target.value })
                      }
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.quantity}
                      onChange={(e) =>
                        setUpdatedRow({ ...updatedRow, quantity: e.target.value })
                      }
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.units}
                      onChange={(e) => setUpdatedRow({ ...updatedRow, units: e.target.value })}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.unit_price}
                      onChange={(e) =>
                        setUpdatedRow({ ...updatedRow, unit_price: e.target.value })
                      }
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    ₹{(updatedRow.quantity * updatedRow.unit_price).toFixed(2)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.description}
                      onChange={(e) =>
                        setUpdatedRow({ ...updatedRow, description: e.target.value })
                      }
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <Input
                      value={updatedRow.domain}
                      onChange={(e) => setUpdatedRow({ ...updatedRow, domain: e.target.value })}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>
                    <Button type="primary" onClick={handleSave}>
                      Save
                    </Button>
                    <Button type="default" onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.name}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.category_name}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.brand}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.supplier_id}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.quantity}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.units}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>₹{item.unit_price}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    ₹{(item.quantity * item.unit_price).toFixed(2)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.description}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{item.domain || "N/A"}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>
                    <Button
                      type="primary"
                      onClick={() => handleModify(item)} // Trigger handleModify with the item
                      style={{ marginRight: 8 }}
                    >
                      Modify
                    </Button>
                    <Button
                      type="default"
                      onClick={() => handleIssue(item)} // Trigger handleIssue with the item
                    >
                      Issue
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Issuing Items */}
      <Modal
        title="Issue Item"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Issue"
        cancelText="Cancel"
      >
        <p>
          <strong>Item:</strong> {modalData.name}
        </p>
        <p>
          <strong>Available Quantity:</strong> {modalData.quantity}
        </p>
        <div style={{ marginBottom: "10px" }}>
          <strong>Quantity to Issue:</strong>
          <Input
            placeholder="Enter quantity to issue"
            value={issueQuantity}
            onChange={(e) => setIssueQuantity(Number(e.target.value))}
            type="number"
            style={{ marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Issued To:</strong>
          <Input
            placeholder="Enter recipient name"
            value={issuedTo}
            onChange={(e) => setIssuedTo(e.target.value)}
            style={{ marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Issued By:</strong>
          <Input
            placeholder="Enter issuer name"
            value={issuedBy}
            onChange={(e) => setIssuedBy(e.target.value)}
            style={{ marginTop: "5px" }}
          />
        </div>
        <p>
          <strong>Issue Date:</strong> {new Date().toISOString().split("T")[0]}
        </p>
      </Modal>
    </div>
  );
};

export default ItemsTable;