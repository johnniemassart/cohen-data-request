import React, { useEffect, useState } from "react";
import "../css/Home.css";
import HomeHeader from "../components/home/HomeHeader";
import HomeInput from "../components/home/HomeInput";
import HomeApiResults from "../components/home/HomeApiResults";
import HomeFilter from "../components/home/HomeFilter";
import HomeApiTable from "../components/home/HomeApiTable";

const Home = () => {
  const [initialSubmit, setInitialSubmit] = useState(false);
  const updateInitialSubmit = () => {
    setInitialSubmit(true);
  };
  return (
    <div className={initialSubmit ? "home-wrapper-grid" : "home-wrapper-flex"}>
      {initialSubmit ? (
        <>
          <div className="home-wrapper-grid-home-header">
            <HomeHeader />
          </div>
          <div className="home-wrapper-grid-api-wrapper">
            {/* <HomeApiResults /> */}
            <HomeApiTable />
          </div>
          <div className="home-wrapper-grid-home-input">
            <div className="home-input-grid-wrapper">
              <HomeInput updateInitialSubmit={updateInitialSubmit} />
            </div>
          </div>
        </>
      ) : (
        <div className="home-wrapper-flex-inner">
          <div className="home-header-wrapper">
            <HomeHeader />
          </div>
          <div className="home-input-flex-wrapper">
            <HomeInput updateInitialSubmit={updateInitialSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
