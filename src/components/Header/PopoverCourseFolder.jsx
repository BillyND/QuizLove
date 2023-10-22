import {
  CopyOutlined,
  FolderOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { windowWidth } from "../../utils/constant";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import { useModal } from "../../utils/useModal";
import ModalCreateCourse from "./ModalCourseFolder/ModalCreateCourse";

export const modalCreateFolderSubs = createSubscription({
  visible: false,
});

window.addEventListener("click", function (event) {
  if (
    !event.target.closest(".ant-popover-content") &&
    !event.target.closest(".anticon-plus")
  ) {
    modalCreateFolderSubs.updateState({
      visible: false,
    });
  }
});

function PopoverCourseFolder(props) {
  const { accessToken } = props;
  const { openModal } = useModal();
  const {
    state: { visible },
    setState: setVisible,
  } = useSubscription(modalCreateFolderSubs, ["visible"]);
  const navigate = useNavigate();
  const locationNow = useLocation();
  const pathname = window.location?.pathname?.replace(/\//g, "");

  const toggleVisiblePopover = () => {
    setVisible({
      visible: !visible,
    });
  };

  const handleClickPopoverCreateData = ({ type, modal, route }) => {
    toggleVisiblePopover();
    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (type === "modal") {
      openModal(modal);
    } else if (route !== pathname) {
      navigate(`/${route}`);
    }
  };

  const activator = (
    <PlusOutlined
      onClick={() => setVisible({ visible: !visible })}
      className="icon-plus flex-center-all cursor-pointer transition-02"
      style={{
        display: windowWidth < 600 && !accessToken ? "none" : "",
      }}
    />
  );

  const contentCourseFolder = (
    <div className="popover-course-folder none-copy">
      <div
        className="item course"
        onClick={() => handleClickPopoverCreateData({ route: "create-set" })}
      >
        <CopyOutlined className="icon" />
        Học phần
      </div>
      <div
        className="item Folder"
        onClick={() =>
          handleClickPopoverCreateData({
            type: "modal",
            modal: "MODAL_CREATE_FOLDER",
          })
        }
      >
        <FolderOutlined className="icon" />
        Thư mục
      </div>
      <div
        className="item class"
        onClick={() =>
          handleClickPopoverCreateData({
            type: "modal",
            modal: "MODAL_CREATE_CLASS",
          })
        }
      >
        <HomeOutlined className="icon" />
        Lớp
      </div>
    </div>
  );

  return (
    <>
      <Popover open={visible} content={contentCourseFolder} trigger="click">
        {activator}
      </Popover>

      <ModalCreateCourse />
    </>
  );
}

export default PopoverCourseFolder;
