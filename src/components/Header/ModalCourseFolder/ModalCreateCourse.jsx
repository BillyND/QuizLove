import { Button, Divider, Modal } from "antd";
import React, { useState } from "react";
import { useModal } from "../../../utils/useModal";
import "./modalCourse.scss";
import Input from "./Input";
import { ContentFolder } from "./ContentFolder";

function ModalCreateCourse(props) {
  const {
    closeModal,
    openModal,
    state: { MODAL_CREATE_FOLDER },
  } = useModal();

  const handleOk = () => {
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        title={<div></div>}
        open={MODAL_CREATE_FOLDER}
        onCancel={handleCancel}
        footer={[
          <>
            <Divider />
            <Button
              key="link"
              type="primary"
              onClick={handleOk}
              className="button-quiz-love"
            >
              Tạo thư mục
            </Button>
          </>,
        ]}
        width={800}
      >
        <div className="modal-course-folder">
          <ContentFolder visibleModal={MODAL_CREATE_FOLDER} />
        </div>
      </Modal>
    </>
  );
}

export default ModalCreateCourse;
