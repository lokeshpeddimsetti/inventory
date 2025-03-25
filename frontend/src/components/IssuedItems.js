import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import axios from "axios";

const IssuedItemsTable = () => {
  const [issuedItemsData, setIssuedItemsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch issued items data
  const fetchIssuedItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/issued_items");
      setIssuedItemsData(response.data); // Assuming the backend returns issued items in `data`
      console.log(issuedItemsData);
    } catch (error) {
      console.error("Error fetching issued items:", error);
      message.error("Failed to fetch issued items. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIssuedItems(); // Fetch issued items when the component mounts
  }, []);

  // Columns for the issued items table
  const issuedItemsColumns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Issued To",
      dataIndex: "issued_to",
      key: "issued_to",
    },
    {
      title: "Issued By",
      dataIndex: "issued_by",
      key: "issued_by",
    },
    {
      title: "Issue Date",
      dataIndex: "issue_date",
      key: "issue_date",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={issuedItemsData}
          columns={issuedItemsColumns}
          rowKey={(record) => record.issue_id} // Assuming `issue_id` is the unique key
        />
      )}
    </div>
  );
};

export default IssuedItemsTable;