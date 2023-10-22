import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { createSubscription } from "../../utils/globalStateHook";
import "./CreateCourse.scss";
import InputCourse from "./InputCourse";
import { ListQuestion } from "./ListQuestion";

export const draftCourse = createSubscription({});

const CreateCourse = () => {
  return (
    <div className="create-course-page container none-copy">
      <div className="header-create-course pt-5 pb-4">
        <div className="title-create">
          <span className="title">Tạo học phần mới</span>
          <span className="saved-time"></span>
        </div>
        <Button disabled className="button-create" type="primary">
          Tạo
        </Button>
      </div>

      <div className="content-create-course">
        <div className="input-info-course">
          <InputCourse
            type={"title"}
            titleMainLabel="Tiêu đề"
            placeHolder={'Nhập tiêu đề, ví dụ: "Sinh học- Chương 22: Tiến hoá"'}
          />
          <InputCourse
            type={"description"}
            titleMainLabel="Mô tả"
            placeHolder={"Thêm mô tả"}
          />
        </div>
        <div className="setting-create-course pt-3">
          <div className="button-setting d-flex justify-content-between align-items-center">
            <Button className="d-flex justify-content-between align-items-center">
              <PlusOutlined /> Nhập
            </Button>
            <Button
              className="d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              <SettingOutlined style={{ scale: "1.4" }} />
            </Button>
          </div>
        </div>

        <ListQuestion />
      </div>
    </div>
  );
};

export default CreateCourse;
