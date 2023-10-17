import {
  CopyOutlined,
  FolderOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import { useModal } from "../../utils/useModal";
import ModalCreateCourse from "./ModalCourseFolder/ModalCreateCourse";

function PopoverCourseFolder(props) {
  const { accessToken } = props;
  const { openModal } = useModal();
  const [visible, setVisible] = useState(false);

  const handleOpenModal = (key) => {
    openModal(key);
    setVisible(false);
  };

  const activator = (
    <PlusOutlined
      onClick={() => setVisible(!visible)}
      className="icon-plus flex-center-all cursor-pointer transition-02"
      style={{
        display: !accessToken ? "none" : "",
      }}
    />
  );

  const contentCourseFolder = (
    <div className="popover-course-folder none-copy">
      <div className="item class">
        <HomeOutlined className="icon" />
        Lớp
      </div>
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
