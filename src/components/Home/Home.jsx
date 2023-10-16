import React from "react";
import { infoUserSubs } from "../../services/customAxios";
import { useSubscription } from "../../utils/globalStateHook";
import HomeGuest from "./HomeGuest";
import HomeLogged from "./HomeLogged";

function Home(props) {
  const {
    state: { accessToken },
  } = useSubscription(infoUserSubs);

  return <>{accessToken ? <HomeLogged /> : <HomeGuest />}</>;
}

export default Home;
