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
import PopoverCourseFolder from "./PopoverCourseFolder";
import { getTriggerToken } from "../../services/api";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../utils/useDebounce";
import PopoverLibrary from "./PopoverLibrary";

let pathnameNow = window.location?.pathname?.replace(/\//g, "");

pathnameNow = "login/register".includes(pathnameNow) ? pathnameNow : "";

export const toggleAuthModalSubs = createSubscription({
  type: pathnameNow,
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

function Header() {
  const navigate = useNavigate();
  const locationNow = useLocation();
  const { setState } = useSubscription(toggleAuthModalSubs);
  const {
    state: { accessToken },
  } = useSubscription(infoUserSubs, ["accessToken"]);
  const pathname = window.location?.pathname?.replace(/\//g, "");
  const debouncePathName = useDebounce(pathname, 10);

  useEffect(() => {
    handleOpenModalLogonRegister(debouncePathName);
  }, [debouncePathName]);

  useEffect(() => {
    getTriggerToken();
  }, []);

  useEffect(() => {
    handleApplyInfoUserToSubs();
  }, [accessToken]);

  const handleMoveLocation = (location) => {
    if (locationNow?.pathname === location) return;
    navigate(location);
  };

  const handleOpenModalLogonRegister = (typeOpen) => {
    setState({
      type: "",
    });
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

              {accessToken ? (
                <PopoverLibrary
                  locationNow={locationNow}
                  handleMoveLocation={handleMoveLocation}
                />
              ) : (
                <PopoverSubjects
                  locationNow={locationNow}
                  handleMoveLocation={handleMoveLocation}
                />
              )}
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
              {/* Create course folder */}
              <PopoverCourseFolder accessToken={accessToken} />

              {/* Info user */}
              {accessToken && <PopoverInfoUser />}

              {!accessToken ? (
                <>
                  <button
                    className="login-button flex-center-all"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="register-button flex-center-all transition-02"
                    onClick={() => navigate("/register")}
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
