import {
  LoadingOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Divider, Popover } from "antd";
import React from "react";
import { getTriggerToken, postLogout } from "../../services/api";
import { initInfoUser } from "../../utils/constant";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import { infoUserSubs } from "./Header";

export const popoverInfoUser = createSubscription({
  isLoading: false,
});

const handleLogout = async () => {
  getTriggerToken();
  if (popoverInfoUser?.state?.isLoading) return;

  popoverInfoUser.updateState({ isLoading: true });
  try {
    await postLogout();
    popoverInfoUser.updateState({ isLoading: false });
  } catch (error) {
    popoverInfoUser.updateState({ isLoading: false });
    console.error(error);
  }

  // Remove data user
  localStorage.removeItem("infoUser");
  infoUserSubs.updateState(initInfoUser);
  getTriggerToken();
};

function PopoverInfoUser(props) {
  const {
    state: { email, username, avatar },
  } = useSubscription(infoUserSubs, ["email", "username", "avatar"]);
  const {
    state: { isLoading },
  } = useSubscription(popoverInfoUser);

  const activator = (
    <div
      className="icon-avatar-user-header flex-center-all cursor-pointer transition-02"
      style={{
        backgroundImage: `url(${avatar})`,
      }}
    ></div>
  );

  const contentPopoverUser = (
    <div className="popover-info-user none-copy">
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
    <Popover
      placement="bottomRight"
      content={contentPopoverUser}
      trigger="click"
    >
      {activator}
    </Popover>
  );
}

export default PopoverInfoUser;
