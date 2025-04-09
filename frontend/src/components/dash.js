import React, { useState } from "react";
import { Menu, Spin } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import axios from "axios"; // Import axios for HTTP requests
import ItemsTable from "./ItemsTable"; // Import ItemsTable
import AddUser from "./AddUser"; // Import AddUser
import IssuedItemsTable from "./IssuedItems"; // Import IssuedItemsTable
import AddItems from "./AddItems"; // Import AddItems
import Purchases from "./Purchases"; // Import Purchases component
import AddSupplier from "./AddSupplier"; // Import AddSupplier component
import PurchasesList from "./PurchasesList";


const items = [
  {
    key: "domains",
    label: "Domains",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "hostelCanteen",
        label: "Hostel Canteen",
        children: [
          { key: "dairy", label: "Dairy" },
          { key: "grocery", label: "Grocery" },
        ],
      },
      {
        key: "itStationary",
        label: "IT Stationary",
        children: [{ key: "a4sheets", label: "A4 Sheets" }],
      },
    ],
  },
];

const Dash = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIssuedItems, setShowIssuedItems] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false); // State to toggle Add User view
  const [showAddItems, setShowAddItems] = useState(false); // State to toggle Add Items view
  const [showPurchases, setShowPurchases] = useState(false); // State to toggle Purchases view
  const [showAddSupplier, setShowAddSupplier] = useState(false); // State to toggle Add Supplier view
  const [showPurchasesList, setShowPurchasesList] = useState(false); // State to toggle Purchases List view
  // Fetch items based on the selected category
  const fetchItems = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/items/${category}`);
      setItemsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch items. Please try again later.");
    }
    setLoading(false);
  };

  // Handle category selection
  const handleClick = (e) => {
    setSelectedCategory(e.key);
    fetchItems(e.key);
    setShowIssuedItems(false); // Hide issued items view when a category is selected
    setShowAddUser(false); // Hide Add User view when a category is selected
    setShowAddItems(false); // Hide Add Items view when a category is selected
    setShowPurchases(false); // Hide Purchases view when a category is selected
    setShowAddSupplier(false); // Hide Add Supplier view when a category is selected
  };

  // Show issued items table
  const handleShowIssuedItems = () => {
    setShowIssuedItems(true);
    setShowAddUser(false); // Hide Add User view when issued items are shown
    setShowAddItems(false); // Hide Add Items view when issued items are shown
    setShowPurchases(false); // Hide Purchases view when issued items are shown
    setShowAddSupplier(false); // Hide Add Supplier view when issued items are shown
  };

  // Show Add User page
  const handleShowAddUser = () => {
    setShowAddUser(true);
    setShowIssuedItems(false); // Hide issued items view when Add User is shown
    setShowAddItems(false); // Hide Add Items view when Add User is shown
    setShowPurchases(false); // Hide Purchases view when Add User is shown
    setShowAddSupplier(false); // Hide Add Supplier view when Add User is shown
  };

  // Show Add Items page
  const handleShowAddItems = () => {
    setShowAddItems(true);
    setShowIssuedItems(false); // Hide issued items view when Add Items is shown
    setShowAddUser(false); // Hide Add User view when Add Items is shown
    setShowPurchases(false); // Hide Purchases view when Add Items is shown
    setShowAddSupplier(false); // Hide Add Supplier view when Add Items is shown
  };

  // Show Purchases page
  const handleShowPurchases = () => {
    setShowPurchases(true);
    setShowAddItems(false); // Hide Add Items view when Purchases is shown
    setShowIssuedItems(false); // Hide issued items view when Purchases is shown
    setShowAddUser(false); // Hide Add User view when Purchases is shown
    setShowAddSupplier(false); // Hide Add Supplier view when Purchases is shown
  };

  // Show Add Supplier page
  const handleShowAddSupplier = () => {
    setShowAddSupplier(true);
    setShowAddUser(false); // Hide Add User view when Add Supplier is shown
    setShowIssuedItems(false); // Hide issued items view when Add Supplier is shown
    setShowAddItems(false); // Hide Add Items view when Add Supplier is shown
    setShowPurchases(false); // Hide Purchases view when Add Supplier is shown
  };
  // Show Purchases List page
  const handleShowPurchasesList = () => {
    setShowPurchasesList(true);
    setShowAddUser(false); // Hide Add User view when Purchases List is shown
    setShowIssuedItems(false); // Hide issued items view when Purchases List is shown
    setShowAddItems(false); // Hide Add Items view when Purchases List is shown
    setShowPurchases(false); // Hide Purchases view when Purchases List is shown
    setShowAddSupplier(false); // Hide Add Supplier view when Purchases List is shown
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: 256, background: "#f0f2f5", padding: 10 }}>
        <h3 style={{ textAlign: "center" }}>Inventory</h3>
        <Menu onClick={handleClick} mode="inline" items={items} />
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={handleShowAddUser} // Show Add User page
        >
          + Add User
        </button>
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#52c41a",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={handleShowIssuedItems} // Show issued items
        >
          Issued Items
        </button>
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={handleShowAddItems} // Show Add Items page
        >
          + Add Items
        </button>
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={handleShowPurchases} // Show Purchases page
        >
          + Add Purchase
        </button>
             
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#ff5722",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={handleShowPurchasesList}
        >
          Purchases List  
        </button>
        <button
          style={{
            marginTop: "10px",
            width: "100%",
            backgroundColor: "#ff5722",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={handleShowAddSupplier} // Show Add Supplier page
        >
          Supplier
        </button>
      </div>

      {/* Content Section */}
      <div style={{ padding: 20, flex: 1 }}>
        {loading ? (
          <Spin size="large" />
        ) : showAddUser ? (
          <AddUser /> // Render Add User page
        ) : showIssuedItems ? (
          <IssuedItemsTable /> // Render Issued Items Table
        ) : showAddItems ? (
          <AddItems /> // Render Add Items page
        ) : showPurchases ? (
          <Purchases setItemsData={setItemsData} /> // Render Purchases page
        
        ) : showAddSupplier ? (
          <AddSupplier /> // Render Add Supplier page
        ) : selectedCategory && itemsData.length > 0 ? (
          <ItemsTable itemsData={itemsData} setItemsData={setItemsData} />
        ) : (
          <h2>{itemsData.length === 0 ? "No items found for this category" : "Select a category to view items"}</h2>
        )}
      </div>
    </div>
  );
};

export default Dash;