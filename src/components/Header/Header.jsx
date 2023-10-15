import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { infoUserSubs } from "../../services/customAxios";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import PopoverInfoUser from "./PopoverInfoUser";

export const toggleAuthModalSubs = createSubscription({
  type: "",
});

function Header(props) {
  const navigate = useNavigate();
  const locationNow = useLocation();
  const {
    state: { type },
    setState,
  } = useSubscription(toggleAuthModalSubs);
  const {
    state: { accessToken },
  } = useSubscription(infoUserSubs);

  useEffect(() => {
    handleApplyInfoUserToSubs();
  }, []);

  const handleApplyInfoUserToSubs = () => {
    try {
      const infoUser = JSON.parse(localStorage.getItem("infoUser"));
      infoUserSubs.updateState(infoUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveLocation = (location) => {
    if (locationNow?.pathname === location) return;
    navigate(location);
  };

  const handleOpenModalLogonRegister = (typeOpen) => {
    if (typeOpen === type) return;
    setState({
      type: typeOpen,
    });
  };

  return (
    <header className="none-copy TopNavigationWrapper">
      <div className="TopNavigation">
        <div className="TopNavigation-content">
          {/* Header left */}
          <div className="TopNavigation-contentLeft">
            <button
              className="logo cursor-pointer remove-style-button"
              onClick={() => handleMoveLocation("/")}
            >
              QuizLove
            </button>
            <div className="TopNavigation-menuItems">
              <button
                className="item cursor-pointer remove-style-button"
                onClick={() => handleMoveLocation("/")}
              >
                Trang chủ
              </button>
              <button className="item cursor-pointer remove-style-button">
                Chủ đề
              </button>
              <button className="item cursor-pointer remove-style-button">
                Lời giải chuyên gia
              </button>
            </div>
          </div>

          {/* Header middle */}
          <div className="TopNavigation-contentMiddle">
            <div className="TopNavigationItem FullSeachNavigationItem">
              <Search
                placeholder="Học phần, sách giáo khoa, câu hỏi"
                allowClear
              />
            </div>
            <div className="TopNavigationItem RightNavigationItem flex-center-all">
              <PlusOutlined className="icon-plus flex-center-all cursor-pointer transition-02" />

              {/* Info user */}
              {accessToken && <PopoverInfoUser />}

              {!accessToken ? (
                <>
                  <button
                    className="login-button flex-center-all"
                    onClick={() => handleOpenModalLogonRegister("login")}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="register-button flex-center-all transition-02"
                    onClick={() => handleOpenModalLogonRegister("register")}
                  >
                    Đăng ký
                  </button>
                </>
              ) : (
                <button
                  style={{
                    width: "170px",
                    padding: "6px 14px",
                  }}
                  className="register-button flex-center-all transition-02"
                  onClick={() => handleMoveLocation("upgrade")}
                >
                  <span>Dùng thử miễn phí</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
