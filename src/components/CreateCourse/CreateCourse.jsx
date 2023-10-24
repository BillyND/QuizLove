import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { createSubscription } from "../../utils/globalStateHook";
import "./CreateCourse.scss";
import HeaderCreateCourse from "./HeaderCreateCourse";
import { ListQuestion } from "./ListQuestion";
import PopupLeft from "./PopupLeft";
import TitleDescriptionCourse from "./TitleDescriptionCourse";

export const draftCourse = createSubscription({});

const CreateCourse = () => {
  return (
    <div className="create-course-page container none-copy">
      <HeaderCreateCourse />
      <div className="content-create-course">
        <TitleDescriptionCourse />

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

      <PopupLeft />
    </div>
  );
};

export default CreateCourse;
