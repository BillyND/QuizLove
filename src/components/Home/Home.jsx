import React from "react";
import { infoUserSubs } from "../../services/customAxios";
import { useSubscription } from "../../utils/globalStateHook";
import "./Home.scss";
import HomeGuest from "./HomeGuest";
import HomeLogged from "./HomeLogged";

function Home(props) {
  const {
    state: { accessToken },
  } = useSubscription(infoUserSubs);

  return (
    <div className="home-main none-copy">
      {accessToken ? <HomeLogged /> : <HomeGuest />}
    </div>
  );
}

export default Home;
