import { Button, Divider, Modal } from "antd";
import React, { useState } from "react";
import { useModal } from "../../../utils/useModal";
import { ContentFolder } from "./ContentFolder";
import "./modalCourse.scss";

function ModalCreateCourse() {
  const {
    closeModal,
    state: { MODAL_CREATE_FOLDER, MODAL_CREATE_CLASS },
  } = useModal();
  const [enableCreate, setEnableCreate] = useState(false);

  const visible = MODAL_CREATE_FOLDER || MODAL_CREATE_CLASS;

  const title = MODAL_CREATE_FOLDER ? "Tạo thư mục mới" : "Tạo lớp mới";

  const description = MODAL_CREATE_FOLDER
    ? ""
    : "Cung cấp cho các thành viên trong lớp quyền truy cập các hoạt động chất lượng nhất của Quizlet như chế độ Học và Kiểm tra cho tất cả nội dung trong lớp của bạn. Hoàn toàn miễn phí!";

  const handleOk = () => {
    closeModal();
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
          <>
            <Divider />
            <Button
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
          </>,
        ]}
        width={800}
      >
        <div className="modal-course-folder">
          <ContentFolder
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
