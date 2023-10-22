import React from "react";
import "./CreateCourse.scss";
import { Button } from "antd";
import InputCourse from "./InputCourse";

const CreateCourse = () => {
  return (
    <div className="create-course-page container">
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
            titleMainLabel="Tiêu đề"
            placeHolder={'Nhập tiêu đề, ví dụ: "Sinh học- Chương 22: Tiến hoá"'}
          />
          <InputCourse titleMainLabel="Mô tả" placeHolder={"Thêm mô tả"} />
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
