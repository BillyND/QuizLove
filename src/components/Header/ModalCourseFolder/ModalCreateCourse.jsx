import { Button, Divider, Modal, message } from "antd";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFolder } from "../../../services/api";
import { useModal } from "../../../utils/useModal";
import { ContentFolder } from "./ContentFolder";
import "./modalCourse.scss";
import { infoUserSubs } from "../Header";

function ModalCreateCourse() {
  const {
    closeModal,
    state: { MODAL_CREATE_FOLDER, MODAL_CREATE_CLASS },
  } = useModal();
  const [enableCreate, setEnableCreate] = useState(false);
  const [infoCreatePost, setInfoCreatePost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const visible = MODAL_CREATE_FOLDER || MODAL_CREATE_CLASS;
  const title = MODAL_CREATE_FOLDER ? "Tạo thư mục mới" : "Tạo lớp mới";

  const description = MODAL_CREATE_FOLDER
    ? ""
    : "Cung cấp cho các thành viên trong lớp quyền truy cập các hoạt động chất lượng nhất của Quizlet như chế độ Học và Kiểm tra cho tất cả nội dung trong lớp của bạn. Hoàn toàn miễn phí!";

  const handleOk = async () => {
    setIsLoading(true);
    try {
      const resInfoPost = MODAL_CREATE_FOLDER
        ? await createFolder(infoCreatePost)
        : null;

      const folderId = resInfoPost?.data?._id;

      if (resInfoPost?.EC === 0 && folderId) {
        navigate(`/${infoUserSubs?.state?.email}/folders/${folderId}`);
      } else {
        message.error("Tạo thư mục thất bại!");
      }

      setIsLoading(false);
      closeModal();
    } catch (error) {
      message.error("Máy chủ lỗi!");
      console.error(error);
      setIsLoading(false);
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        className="none-copy"
        open={visible}
        onCancel={handleCancel}
        style={{ top: window.innerWidth < 400 ? 50 : "" }}
        footer={[
          <Fragment key={1}>
            <Divider />
            <Button
              loading={isLoading}
              disabled={!enableCreate}
              key="link"
              type="primary"
              onClick={handleOk}
              className={`button-quiz-love ${
                !enableCreate ? "button-disabled" : ""
              }`}
            >
              Tạo thư mục
            </Button>
          </Fragment>,
        ]}
        width={800}
      >
        <div className="modal-course-folder">
          <ContentFolder
            setInfoCreatePost={setInfoCreatePost}
            type={MODAL_CREATE_FOLDER ? "folder" : "class"}
            description={description}
            title={title}
            visibleModal={visible}
            setEnableCreate={setEnableCreate}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalCreateCourse;
