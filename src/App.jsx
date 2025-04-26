import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import PostView from "./PostView";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import CreateForum from "./createForum";
import { AuthProvider } from "./AuthContext";
import './App.css';




const App = () => {

  return (
      <div>

        
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element = {<Layout />} >
                <Route index={true} element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/postview/:id" element={<PostView />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/createforum" element={<CreateForum />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        
        

      </div>
  )
}

export default App;