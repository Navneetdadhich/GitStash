import { useState } from "react";
import {Toaster} from 'react-hot-toast';
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LikesPage from "./pages/LikesPage";
import ExplorePage from "./pages/ExplorePage";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";

function App() {

  const {authUser, loading} = useAuthContext();
  // console.log("Authenticated user" , authUser);

  if(loading) return null;

  /*
  <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
   */

  
  return (
    <>
      <div className="flex absolute sm:h-screen h-[1000px] text-black inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] ">
      <div class="absolute bottom-0 left-0 right-0 top-0 -z-9 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>

      <div className="flex relative w-full min-h-screen">
        {authUser&&<Sidebar />}
        <div className={`${authUser ? 'max-w-4xl mx-auto' : 'w-full h-screen'} text-white transition-all duration-300 flex-1`}>
          <Routes>
            <Route path="/" element={authUser ? <Navigate to="/home" /> : <LandingPage />}/>

            <Route path="/home" element={authUser ? <HomePage /> : <Navigate to={"/"}/>} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/home"}/>} />

            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/home"}/>}  />
            <Route path="/repository" element={authUser ? <ExplorePage /> : <Navigate to={"/login"}/>} />
            {/* <Route path="/likes" element={authUser ? <LikesPage /> : <Navigate to={"/login"}/>} /> */}
            
          </Routes>
          <Toaster />
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
