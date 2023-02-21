import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import MainContent from "../pages/MainContent";

const Home = () => {
  return (
    <div className="body_content">
      <div className="home">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
