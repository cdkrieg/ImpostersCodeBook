// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyPosts from "./pages/MyPosts/myPosts";
import SideBar from "./components/SideBar/SideBar";
import FeedPage from "./pages/FeedPage/feedPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";

function App() {
  return (
    <div>
      <Navbar />
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feedPage" element={<FeedPage />} />
        <Route path="/friendsPage" element={<FriendsPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
