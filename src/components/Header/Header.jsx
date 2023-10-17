import { MenuOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import PopoverInfoUser from "./PopoverInfoUser";
import PopoverSubjects from "./PopoverSubjects";

export const toggleAuthModalSubs = createSubscription({
  type: "",
});

export const infoUserSubs = createSubscription({
  email: "",
  isAdmin: false,
  username: "",
  _id: "",
  createdAt: "",
  updatedAt: "",
  accessToken: "",
  refreshToken: "",
});

export const handleApplyInfoUserToSubs = () => {
  try {
    const infoUser = JSON.parse(localStorage.getItem("infoUser"));
    infoUserSubs.updateState(infoUser);
  } catch (error) {
    console.error(error);
  }
};

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
  }, [accessToken]);

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
            <MenuOutlined className="button-menu-left" />
            <div
              className="logo-mini"
              onClick={() => handleMoveLocation("/")}
            ></div>
            <span
              className="logo cursor-pointer remove-style-button"
              onClick={() => handleMoveLocation("/")}
            >
              QuizLove
            </span>
            <div className="TopNavigation-menuItems">
              <button className="item cursor-pointer remove-style-button">
                <div className="text" onClick={() => handleMoveLocation("/")}>
                  <span> Trang chủ</span>
                  <span
                    className="line-footer-nav"
                    style={{
                      opacity: locationNow?.pathname === "/" ? "1" : "",
                    }}
                  />
                </div>
              </button>

              <PopoverSubjects
                locationNow={locationNow}
                handleMoveLocation={handleMoveLocation}
              />

              <button className="item cursor-pointer remove-style-button">
                <div
                  className="text"
                  onClick={() => handleMoveLocation("/explanations")}
                >
                  Lời giải chuyên gia
                  <span
                    className="line-footer-nav"
                    style={{
                      opacity: locationNow?.pathname?.includes("/explanations")
                        ? "1"
                        : "",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Header middle */}
          <div className="TopNavigation-contentMiddle">
            <div className="space-phone"></div>
            <div className="TopNavigationItem FullSearchNavigationItem">
              <Search
                placeholder="Học phần, sách giáo khoa, câu hỏi"
                prefix={<SearchOutlined className="icon-search" />}
                allowClear
              />
            </div>
            <div className="TopNavigationItem RightNavigationItem flex-center-all">
              <PlusOutlined
                className="icon-plus flex-center-all cursor-pointer transition-02"
                style={{
                  display: !accessToken ? "none" : "",
                }}
              />

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
                    width: "96px",
                    padding: "6px 14px",
                  }}
                  className="register-button flex-center-all transition-02"
                  onClick={() => handleMoveLocation("upgrade")}
                >
                  <span>Nâng cấp</span>
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
