import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dash from "./components/dash";
import AddItems from "./components/AddItems";
import FacultyDashboard from "./components/FacultyDashboard";
import InventoryDashboard from "./components/InventoryDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import AddUser from "./components/AddUser";
import ContentSection from "./components/ContentSection";
import IssuedItems from "./components/IssuedItems"
import PurchasesList from "./components/PurchasesList";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/addItems" element={<AddItems />} />
                <Route path="/facultyDashboard" element={<FacultyDashboard  />} />
                <Route path="/inventoryDashboard" element={<InventoryDashboard />} />
                <Route path="/dash" element={<Dash/>}/>
                <Route path="/ManagerDashboard" element={<ManagerDashboard/>} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/content" element={<ContentSection />} />
                <Route path="/issueditems" element={<IssuedItems />} />
                <Route path="/purchases" element={<PurchasesList />} />
            </Routes>
        </Router>
    );
}

export default App;
