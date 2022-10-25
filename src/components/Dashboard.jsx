import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

const followComponent = [
  {
    userImg: "https://rb.gy/urakiy",
    username: "SpaceX",
    tag: "@SpaceX",
  },
  {
    userImg: "https://rb.gy/aluxgh",
    username: "Elon Musk",
    tag: "@elonmusk",
  },
  {
    userImg: "https://rb.gy/zyvazm",
    username: "Tesla",
    tag: "@Tesla",
  },
];

const trendingComponent = [
  {
    heading: "T20 World Cup 2021 · LIVE",
    description:
      "NZvAUS: New Zealand and Australia clash in the T20 World Cup final",
    img: "https://rb.gy/d9yjtu",
    tags: ["#T20WorldCupFinal, ", "Kane Williamson"],
  },
  {
    heading: "Trending in United Arab Emirates",
    description: "#earthquake",
    img: "https://rb.gy/jvuy4v",
    tags: ["#DubaiAirshow, ", "#gessdubai"],
  },
  {
    heading: "Trending in Digital Creators",
    description: "tubbo and quackity",
    img: "",
    tags: ["QUACKITY AND TUBBO,"],
  },
];

const Dashboard = () => {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="">
      <main className="bg-black min-h-screen flex max-w-[1500px]">
        <Sidebar />
        <Feed />
        <Widgets
          trendingComponent={trendingComponent}
          followComponent={followComponent}
        />
      </main>
    </div>
  );
};

export default Dashboard;
