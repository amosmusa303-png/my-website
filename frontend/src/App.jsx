import { Route, Routes } from "react-router-dom";
import "./App.css";

// import Greetings from "./components/Greetings";
// import Welcome from "./components/Welcome";
// import Counter from "./components/Counter";
// import LoginMessage from "./components/LoginMessage";
import Contact from "./components/contact";
import Home from "./components/home";
import About from "./components/about";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/login";
import Profile from "./components/profile";

function App() {
  // const logged = true;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="user/:name" element={<UserProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}
export default App;
