import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
 import { database } from "../fireBaseConfig";

import UserForm from "../components/UserForm";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const userRef = ref(database, `users/${id}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      setUser(snapshot.val());
    });

    // Optional cleanup
    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [id]);

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <UserForm viewMode={true} initialData={user} />
    </div>
  );
};

export default ViewUser;
