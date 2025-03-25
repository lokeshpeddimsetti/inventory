import React, { useState } from "react";
import axios from "axios";

const AddSupplier = () => {
    const [formData, setFormData] = useState({
        supplier_id: "",
        name: "",
        contact: "",
        address: "",
        contact_person: "" // New field for contact person
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/addSupplier", formData);
            alert(response.data.message);
            setFormData({
                supplier_id: "",
                name: "",
                contact: "",
                address: "",
                contact_person: "" // Reset the new field
            }); // Reset form after successful submission
        } catch (error) {
            alert("Error adding supplier: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add New Supplier</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="supplier_id"
                    placeholder="Supplier ID"
                    value={formData.supplier_id}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="contact_person"
                    placeholder="Contact Person" // New input field
                    value={formData.contact_person}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    Add Supplier
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    heading: { marginBottom: "20px", color: "#333" },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px"
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
    }
};

export default AddSupplier;