import React, { useEffect } from "react";
import { infoUserSubs } from "../../services/customAxios";
import { useSubscription } from "../../utils/globalStateHook";
import HomeGuest from "./HomeGuest";
import HomeLogged from "./HomeLogged";
import "./Home.scss";
import { handleApplyInfoUserToSubs } from "../Header/Header";

function Home(props) {
  const {
    state: { accessToken },
  } = useSubscription(infoUserSubs, ["accessToken"]);

  useEffect(() => {
    !accessToken && handleApplyInfoUserToSubs();
  }, []);

  return (
    <div className="container home-main none-copy">
      {accessToken ? <HomeLogged /> : <HomeGuest />}
    </div>
  );
}

export default Home;
