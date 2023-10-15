import {
  LoadingOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Divider, Popover } from "antd";
import React, { useState } from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { postLogout } from "../../services/api";
import { infoUserSubs } from "../../services/customAxios";
import { toast } from "react-toastify";

function PopoverInfoUser(props) {
  const {
    state: { email, username },
    setState,
  } = useSubscription(infoUserSubs);
  const [isLoading, setIsLoading] = useState(false);

  const activator = (
    <div
      className="icon-avatar-user-header flex-center-all cursor-pointer transition-02"
      style={{
        backgroundImage:
          "url('https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png')",
      }}
    ></div>
  );

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await postLogout();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }

    // Remove data user
    localStorage.removeItem("infoUser");
    setState({
      email: "",
      isAdmin: false,
      username: "",
      _id: "",
      createdAt: "",
      updatedAt: "",
      accessToken: "",
      refreshToken: "",
    });

    toast.success("Đăng xuất thành công!");
  };

  const contentPopoverUser = (
    <div className="popover-info-user">
      <div className="header-popover">
        {activator}
        <div className="info-user">
          <span className="name">{username}</span>
          <span className="email">{email}</span>
        </div>
      </div>
      <Divider className="divider-user" />
      <div className="setting-user">
        <button className="remove-style-button item user-info">
          <SmileOutlined className="icon" />
          Hồ sơ
        </button>
        <button className="remove-style-button item user-info">
          <SettingOutlined className="icon" />
          Cài đặt
        </button>
      </div>
      <Divider className="divider-user" />
      <div className="setting-user">
        <button
          disabled={isLoading}
          className="remove-style-button item user-info"
          onClick={handleLogout}
        >
          Đăng xuất {isLoading && <LoadingOutlined />}
        </button>
      </div>
    </div>
  );

  return (
    <Popover placement="topLeft" content={contentPopoverUser} trigger="click">
      {activator}
    </Popover>
  );
}

export default PopoverInfoUser;
