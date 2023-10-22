import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { FormLogin } from "./FormLogin";
import FormRegister from "./FormRegister";
import { toggleAuthModalSubs } from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const {
    state: { type },
  } = useSubscription(toggleAuthModalSubs, ["type"]);

  const [currentScrollHeight, setCurrentScrollHeight] = useState("");

  const handleCloseModalLogin = () => {
    navigate("/");
  };

  const handleOpenModalLogonRegister = (typeOpen) => {
    navigate(`/${typeOpen}`);
  };

  return (
    <div
      className={`none-copy modal-login-register ${
        type === "login" || type === "register" ? "show-modal" : ""
      }`}
    >
      <div className="content-login-register-left">
        {type === "login" ? (
          <h1 className="content-right-login">
            Học hiệu quả mà thật thoải mái.
          </h1>
        ) : (
          <h1 className="content-right-register">
            Tham gia một cộng đồng sôi nổi với hơn 300 triệu người học trên toàn
            thế giới.
          </h1>
        )}

        <h1 className="logo-footer">QuizLove</h1>
      </div>
      <div
        className="content-login-register-right"
        style={{
          display: type === "login" || type === "register" ? "block" : "",
        }}
      >
        <div className="header-login-register">
          <button className="remove-style-button">
            <CloseOutlined
              className="icon-close-login-register"
              onClick={handleCloseModalLogin}
            />
          </button>
        </div>
        <div className="content-login-register">
          <div className="group-button-login-register ">
            <button
              className={`transition-02 cursor-pointer register-button  transition-02 remove-style-button ${
                type === "register" ? "selected" : ""
              }`}
              onClick={() => handleOpenModalLogonRegister("register")}
            >
              Đăng ký
              <span
                className={`transition-02 line-footer ${
                  type === "register" ? "show-line" : ""
                }`}
              ></span>
            </button>
            <button
              className={`transition-02 cursor-pointer login-button  remove-style-button ${
                type === "login" ? "selected" : ""
              }`}
              onClick={() => handleOpenModalLogonRegister("login")}
            >
              Đăng nhập
              <span
                className={`transition-02 line-footer ${
                  type === "login" ? "show-line" : ""
                }`}
              ></span>
            </button>
          </div>

          {type === "login" ? (
            <FormLogin
              handleOpenModalLogonRegister={handleOpenModalLogonRegister}
            />
          ) : (
            <FormRegister
              handleOpenModalLogonRegister={handleOpenModalLogonRegister}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
