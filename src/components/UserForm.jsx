import React, { useState, useEffect } from "react";
import "./UserForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { ref, push, set, get,  } from "firebase/database";
import { database } from "../firebaseConfig";

const UserForm = ({ initialData, viewMode }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // get user ID from URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
  });

  // Load user data if editing/viewing
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else if (id) {
      const userRef = ref(database, `users/${id}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setForm(snapshot.val());
          } else {
            alert("User not found.");
            navigate(-1);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [initialData, id, navigate]);

  const handleChange = (e) => {
    if (viewMode && !editMode) return;

    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { name, email, username } = form;
    if (!name || !email || !username) {
      alert("Please fill required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (viewMode && !editMode) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (!viewMode) {
        // ADD NEW USER
        const usersRef = ref(database, "users");
        await push(usersRef, {
          ...form,
          createdAt: new Date().toISOString(),
        });
        alert("User Added Successfully!");
      } else {
        // UPDATE EXISTING USER
        if (!id) {
          alert("User ID not found for update.");
          return;
        }
        const userRef = ref(database, `users/${id}`);
        await set(userRef, {
          ...form,
          updatedAt: new Date().toISOString(),
        });
        alert("User Updated Successfully!");
        setEditMode(false); // exit edit mode
      }
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{viewMode ? (editMode ? "Edit User" : "View User") : "Add User"}</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Name *</label>
        <input
          className="form-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={viewMode && !editMode}
          required
        />

        <label className="form-label">Username *</label>
        <input
          className="form-input"
          name="username"
          value={form.username}
          onChange={handleChange}
          disabled={viewMode && !editMode}
          required
        />

        <label className="form-label">Email *</label>
        <input
          className="form-input"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          disabled={viewMode && !editMode}
          required
        />

        <label className="form-label">Phone</label>
        <input
          className="form-input"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={viewMode && !editMode}
        />

        <label className="form-label">Website</label>
        <input
          className="form-input"
          name="website"
          value={form.website}
          onChange={handleChange}
          disabled={viewMode && !editMode}
        />

        <p className="section-title">Address</p>

        <label className="form-label">Street</label>
        <input
          className="form-input"
          name="address.street"
          value={form.address.street}
          onChange={handleChange}
          disabled={viewMode && !editMode}
        />

        <label className="form-label">Suite</label>
        <input
          className="form-input"
          name="address.suite"
          value={form.address.suite}
          onChange={handleChange}
          disabled={viewMode && !editMode}
        />

        <label className="form-label">City</label>
        <input
          className="form-input"
          name="address.city"
          value={form.address.city}
          onChange={handleChange}
          disabled={viewMode && !editMode}
        />

        <label className="form-label">Zipcode</label>
        <input
          className="form-input"
          name="address.zipcode"
          value={form.address.zipcode}
          onChange={handleChange}
          disabled={viewMode && !editMode}
        />

        {!viewMode && (
          <div className="button-group">
            <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button type="button" className="btn btn-cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        )}

        {viewMode && !editMode && (
          <div className="button-group">
            <button type="button" className="btn btn-submit" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <button type="button" className="btn btn-cancel" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        )}

        {viewMode && editMode && (
          <div className="button-group">
            <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button type="button" className="btn btn-cancel" onClick={() => setEditMode(false)}>
              Cancel Edit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
