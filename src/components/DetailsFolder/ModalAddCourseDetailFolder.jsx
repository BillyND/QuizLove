import { PlusOutlined } from "@ant-design/icons";
import { Grid, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { modalSubscription } from "./DetailFolder";
import { useSubscription } from "../../utils/globalStateHook";
import { useNavigate } from "react-router-dom";
import { popoverLibSubscription } from "../Header/PopoverLibrary";
import { getCourseByCondition } from "../../services/api";

const handleCloseModal = () => {
  modalSubscription.updateState({
    ...modalSubscription.state,
    MODAL_ADD_COURSE: false,
  });
};

const ButtonAddCourse = () => {
  const navigate = useNavigate();

  const handleClickCreateCourse = () => {
    handleCloseModal();
    navigate("/create-set");
  };

  return (
    <div style={{ paddingBlockStart: "90px" }}>
      <div className="add-course flex-center-all gap-1">
        <div className="button" onClick={handleClickCreateCourse}>
          <PlusOutlined />
          <span>TẠO HỌC PHẦN MỚI</span>
        </div>
      </div>
    </div>
  );
};

function ModalAddCourseDetailFolder(props) {
  const {
    state: { MODAL_ADD_COURSE },
  } = useSubscription(modalSubscription, ["MODAL_ADD_COURSE"]);
  const [listCourse, setListCourse] = useState([]);

  useEffect(() => {
    handleGetCourse();
  }, []);

  const handleGetCourse = async () => {
    const resFolder = await getCourseByCondition({
      limit: 1000,
    });
    setListCourse(resFolder?.data);

    console.log("===>resFolder:", resFolder?.data);
  };

  return (
    <Modal
      width={600}
      className="modal-show-course  none-copy"
      title={<h1 className="title-modal-show-course">Thêm học phần</h1>}
      onCancel={handleCloseModal}
      open={MODAL_ADD_COURSE}
      footer={[]}
    >
      <div className="d-grid gap-4">
        <ButtonAddCourse />

        {listCourse?.map((item, index) => {
          return (
            <div className="item-course" key={item?._id}>
              {item?.title}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default ModalAddCourseDetailFolder;
