import React from "react";
import { useSubscription } from "../../utils/globalStateHook";
import "./Home.scss";
import HomeGuest from "./HomeGuest";
import HomeLogged from "./HomeLogged";
import { infoUserSubs } from "../Header/Header";

function Home(props) {
  const {
    state: { accessToken },
  } = useSubscription(infoUserSubs);

  return (
    <div className="home-main none-copy ">
      {accessToken ? <HomeLogged /> : <HomeGuest />}
    </div>
  );
}

export default Home;
