import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { database } from "../firebaseConfig";
import "../pages/HomePage.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users from Firebase
  function fetchData () {
    setLoading(true);
    setError(null);

    try {
      const usersRef = ref(database, "users");
      
      const unsubscribe = onValue(
        usersRef,
        (snapshot) => {
          const obj = snapshot.val();

          if (!obj) {
            setData([]);
            setLoading(false);
            return;
          }

          // Convert Firebase object → array
          const usersArray = Object.entries(obj).map(([id, value]) => ({
            id,
            ...value,
          }));

          setData(usersArray);
          setLoading(false);
        },
        (error) => {
          setError(`Failed to fetch data: ${error.message}`);
          setLoading(false);
        }
      );

      // Return cleanup function
      return unsubscribe;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(`Failed: ${errorMessage}`);
      setLoading(false);
    }
  };

  // Delete user from Firebase + UI
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const userRef = ref(database, `users/${id}`);
      await remove(userRef);

      // Update UI instantly
      setData((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed. Please try again.");
    }
  };

  const handleViewUser = (id) => {
    navigate(`/view/${id}`);
  };

  useEffect(() => {
    fetchData();

  
  }, []);

  return (
    <div className="homepage-root">
      <NavBar />
      <main className="homepage-container">
        <h1 className="homepage-title">Welcome to the HomePage</h1>

        {loading && <Loader />}

        {error && (
          <div className="homepage-error">
            <p>Error: {error}</p>
            <button onClick={fetchData} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="user-list">
            {data.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Username: {user.username}</p>

                <div className="user-buttons">
                  <button className="view-btn" onClick={() => handleViewUser(user.id)}>
                    View
                  </button>
                  <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="empty-state">
            <p>No users found.</p>
            <button onClick={fetchData} className="retry-btn">
              Refresh
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
