import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import UserContext from "./context/UserContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  const deletePost = (id) => {
    let newPosts = posts.filter((post) => post.postID !== id);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    updatePosts(newPosts);
  };

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("posts")));
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        posts,
        updatePosts,
        deletePost,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
