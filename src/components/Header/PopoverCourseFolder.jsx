import {
  CopyOutlined,
  FolderOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useModal } from "../../utils/useModal";
import ModalCreateCourse from "./ModalCourseFolder/ModalCreateCourse";
import { windowWidth } from "../../utils/constant";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";

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

  const handleOpenModal = (key) => {
    openModal(key);
    setVisible({ visible: false });
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
      <div className="item course">
        <CopyOutlined className="icon" />
        Học phần
      </div>
      <div
        className="item Folder"
        onClick={() => handleOpenModal("MODAL_CREATE_FOLDER")}
      >
        <FolderOutlined className="icon" />
        Thư mục
      </div>
      <div
        className="item class"
        onClick={() => handleOpenModal("MODAL_CREATE_CLASS")}
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
