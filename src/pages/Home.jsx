import React from "react";
import "../css/Home.css";
import HomeHeader from "../components/home/HomeHeader";
import HomeInput from "../components/home/HomeInput";
import HomeApiResults from "../components/home/HomeApiResults";

const Home = () => {
  return (
    <div className="home-wrapper">
      <HomeHeader />
      <HomeInput />
      <HomeApiResults />
    </div>
  );
};

export default Home;
