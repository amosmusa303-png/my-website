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
      const res = axios.get(`http://localhost:2468/users/${userId})`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(res.data);
    };
    getUser();
  }, [token, userId]);

  return (
    <div>
      <h1>Shabah Profile</h1>

      <ul>
        <li>Name: {currentUser} </li>
        <li>Age: {currentUser} </li>
        <li>Email: {currentUser} </li>
      </ul>
    </div>
  );
}

export default Profile;
