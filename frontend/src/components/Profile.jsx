import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserId = () => {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    };
    getUserId();
  }, [token]);
  useEffect(() => {
    const getUser = () => {
      const res = axios.get(
        "https://my-website-bcss.onrender.com/users/${userId})",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCurrentUser(res.data);
    };
    getUser();
  }, [token, userId]);

  return (
    <div>
      <h1>Shabah Profile</h1>

      <ul>
        <p><b>Name: {currentUser.name}</b> </p>
        <p><b>Age: {currentUser.age}</b> </p>
        <p><b>Email: {currentUser.email}</p>
      </ul>
    </div>
  );
}

export default Profile;
