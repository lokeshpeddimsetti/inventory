const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

// ✅ Database Connection
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "asd123",
  database: "inventory",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

app.use(cors());
app.use(bodyParser.json());

// ✅ Login Route
// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validate input
      if (!email || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Fetch user from the database
      const sql = `SELECT * FROM users WHERE email = ? AND role = ?`;
      const [data] = await db.query(sql, [email, role]);
  
      if (data.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      const user = data[0];
  
      // Compare the entered password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      // If password is valid, return success response
      res.json({ success: true, user: { id: user.user_id, username: user.username, role: user.role } });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

// ✅ Add Item
app.post("/addItem", async (req, res) => {
    try {
        const { name, category_name, brand, supplier_id, quantity, units, unit_price, description, domain } = req.body;
        const values = [name, category_name, brand, supplier_id, quantity, units, unit_price, description, domain];

        const sql = `INSERT INTO items (name, category_name, brand, supplier_id, quantity, units, unit_price, description, domain) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [data] = await db.query(sql, values);
        res.json({ success: true, message: "Item added successfully", data });
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).json({ success: false, message: "Database error", error: err });
    }
});

// ✅ Add Domain
app.post("/addDomain", async (req, res) => {
    try {
        const { domain } = req.body;
        if (!domain) return res.status(400).json({ message: "Domain name is required!" });

        const sql = "INSERT INTO items (domain) VALUES (?)";
        await db.query(sql, [domain]);

        res.json({ message: "Domain added successfully!" });
    } catch (err) {
        console.error("Error adding domain:", err);
        res.status(500).json({ message: "Database error", error: err });
    }
});

// ✅ Get All Domains
app.get("/domains", async (req, res) => {
    try {
        const [results] = await db.query("SELECT DISTINCT domain FROM items");
        const domains = results.map(row => row.domain);
        res.json(domains);
    } catch (err) {
        console.error("Error fetching domains:", err);
        res.status(500).json({ message: "Database error", error: err });
    }
});

// ✅ Get Categories of a Specific Domain
app.get("/categories", async (req, res) => {
    try {
        const { domain } = req.query;
        if (!domain) return res.status(400).json({ message: "Domain is required!" });

        const [results] = await db.query("SELECT DISTINCT category_name FROM items WHERE domain = ?", [domain]);
        const categories = results.map(row => row.category_name);
        res.json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Database error", error: err });
    }
});

// ✅ Get All Items
app.get("/items", async (req, res) => {
    try {
        const [data] = await db.query("SELECT * FROM items");
        res.json(data);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Get Items by Category (Dynamically Fetch Data)
app.get("/items/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const [data] = await db.query("SELECT * FROM items WHERE category_name = ?", [category]);
        res.json(data);
    } catch (err) {
        console.error("Error fetching items by category:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Update Item
app.put("/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category_name, brand, supplier_id, quantity, units, unit_price, description, domain } = req.body;
  
      console.log("Updating item with ID:", id); // Debugging
      console.log("Updated data:", req.body); // Debugging
  
      const sql = `
        UPDATE items
        SET 
          name = ?, 
          category_name = ?, 
          brand = ?, 
          supplier_id = ?, 
          quantity = ?, 
          units = ?, 
          unit_price = ?, 
          description = ?, 
          domain = ?
        WHERE id = ?
      `;
      const values = [name, category_name, brand, supplier_id, quantity, units, unit_price, description, domain, id];
  
      console.log("SQL Query:", sql); // Debugging
      console.log("SQL Values:", values); // Debugging
  
      const [result] = await db.query(sql, values);
  
      console.log("SQL result:", result); // Debugging
  
      if (result.affectedRows === 0) {
        console.log("Item not found:", id); // Debugging
        return res.status(404).json({ success: false, message: "Item not found" });
      }
  
      console.log("Item updated successfully:", id); // Debugging
      res.json({ success: true, message: "Item updated successfully" });
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Failed to update item." });
    }
  });
  // POST route to add a new user
  const bcrypt = require("bcrypt");

  // POST route to add a new user
  app.post("/users", async (req, res) => {
    const { username, email, phone, password, role } = req.body;
  
    // Validate input
    if (!username || !email || !phone || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }
  
    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number. Must be 10 digits." });
    }
  
    try {
      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      // Insert user into the database
      const sql = `
        INSERT INTO users (username, email, phone, password_hash, role)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [username, email, phone, passwordHash, role];
      const [result] = await db.query(sql, values);
  
      res.json({ success: true, message: "User added successfully", userId: result.insertId });
    } catch (error) {
      console.error("Error adding user:", error);
  
      // Handle duplicate email or phone errors
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ success: false, message: "Email or phone number already exists." });
      }
  
      res.status(500).json({ success: false, message: "Failed to add user." });
    }
  });

  
  app.post("/issued-items", (req, res) => {
    const { item, quantity, issued_by, issue_date, issued_to } = req.body;
    console.log("Issued Item:", req.body);
  
    if (!item || !quantity || !issued_by || !issued_to || !issue_date) {
      return res.status(400).json({ success: false, message: "Invalid data provided." });
    }
  
    // Insert into issued_items table
    const insertIssuedItemQuery = `
      INSERT INTO issued_items (item, quantity, issued_by, issue_date, issued_to)
      VALUES (?, ?, ?, ?, ?)
    `;
  console.log(insertIssuedItemQuery);
    db.query(
      insertIssuedItemQuery,
      [item, quantity, issued_by, issue_date, issued_to],
      (err, result) => {
        if (err) {
          console.error("Error inserting into issued_items table:", err);
          return res.status(500).json({ success: false, message: "Database error." });
        }
  
        // Update the inventory table to reduce the quantity
        const updateInventoryQuery = `
          UPDATE inventory
          SET quantity = quantity - ?
          WHERE name = ?
        `;
  
        db.query(updateInventoryQuery, [quantity, item], (err, result) => {
          if (err) {
            console.error("Error updating inventory table:", err);
            return res.status(500).json({ success: false, message: "Database error." });
          }
  
          res.json({ success: true, message: "Item issued successfully." });
        });
      }
    );
  });
  app.get("/issued_items", async (req, res) => {
    try {
        const [data] = await db.query("SELECT * FROM issued_items;");
        res.json(data);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ error: "Server error" });
    }
});
app.post("/purchases", async (req, res) => {
  const { item_name, supplier_id, purchase_date, quantity, unit_price } = req.body;

  if (!item_name || !supplier_id || !purchase_date || !quantity || !unit_price) {
    return res.status(400).json({ success: false, message: "Invalid data provided." });
  }

  const total_cost = quantity * unit_price;

  try {
    // Insert the purchase into the purchases table
    const insertPurchaseQuery = `
      INSERT INTO purchases (item_name, supplier_id, purchase_date, quantity, unit_price, total_cost)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query(insertPurchaseQuery, [
      item_name,
      supplier_id,
      purchase_date,
      quantity,
      unit_price,
      total_cost,
    ]);

    // Check if an item with the same name and unit price exists in the items table
    const checkItemQuery = `
      SELECT * FROM items WHERE name = ? AND unit_price = ?
    `;
    const [existingItem] = await db.query(checkItemQuery, [item_name, unit_price]);

    if (existingItem.length > 0) {
      // If the item with the same unit price exists, update its quantity
      const updateItemsQuery = `
        UPDATE items
        SET quantity = quantity + ?
        WHERE name = ? AND unit_price = ?
      `;
      await db.query(updateItemsQuery, [quantity, item_name, unit_price]);
    } else {
      // If the item with the same unit price does not exist, insert a new row
      const insertNewItemQuery = `
        INSERT INTO items (name, quantity, unit_price)
        VALUES (?, ?, ?)
      `;
      await db.query(insertNewItemQuery, [item_name, quantity, unit_price]);
    }

    res.json({ success: true, message: "Purchase added and items table updated successfully." });
  } catch (err) {
    console.error("Error processing purchase:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});
app.get("/suppliers", async (req, res) => {
  try {
    // Fetch all suppliers from the database
    const [suppliers] = await db.query("SELECT supplier_id, supplier_name, contact_person, phone, address FROM suppliers;");
    res.json(suppliers); // Return the list of suppliers
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    res.status(500).json({ message: "Failed to fetch suppliers." });
  }
});

app.post("/addSupplier", async (req, res) => {
  const { supplier_id, supplier_name, contact_person, phone, address } = req.body;

  // Validate input
  if (!supplier_id || !supplier_name || !contact_person || !phone || !address) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Insert the new supplier into the suppliers table
    const insertSupplierQuery = `
      INSERT INTO suppliers (supplier_id, supplier_name, contact_person, phone, address)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(insertSupplierQuery, [supplier_id, supplier_name, contact_person, phone, address]);
    res.json({ success: true, message: "Supplier added successfully." });
  } catch (err) {
    console.error("Error adding supplier:", err);
    res.status(500).json({ success: false, message: "Failed to add supplier." });
  }
});
// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});