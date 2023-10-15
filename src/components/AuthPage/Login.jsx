import React from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { toggleAuthModalSubs } from "../Header";
import { CloseOutlined } from "@ant-design/icons";

function Login(props) {
  const {
    state: { type },
    setState,
  } = useSubscription(toggleAuthModalSubs);

  const handleCloseModalLogin = () => {
    setState({ type: "" });
  };

  if (type !== "login") return;

  return (
    <div className="modal-login-register">
      <div className="content-login-register-left"></div>
      <div className="content-login-register-right">
        <div className="header-login-register">
          <CloseOutlined
            className="icon-close-login-register"
            onClick={handleCloseModalLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
