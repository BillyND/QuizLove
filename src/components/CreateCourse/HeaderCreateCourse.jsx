import { Button, message } from "antd";
import React, { useEffect } from "react";
import {
  createCourse,
  deleteCourse,
  getDraftCourse,
  updateDraftCourse,
} from "../../services/api";
import { useSubscription } from "../../utils/globalStateHook";
import CreateCourse, { draftCourse } from "./CreateCourse";

let timer;

export const handlePostDraftCourse = async (dataProps) => {
  clearTimeout(timer);

  timer = setTimeout(async () => {
    await updateDraftCourse(dataProps);
  }, 500);
};

const ButtonCreate = () => {
  const {
    state: { title },
    state,
  } = useSubscription(draftCourse);

  useEffect(() => {
    handleGetDraftCourse();
  }, []);

  const handleGetDraftCourse = async () => {
    const resGetDraftCourse = await getDraftCourse();

    if (resGetDraftCourse?.data?.[0]) {
      draftCourse.updateState({
        title: resGetDraftCourse?.data?.[0]?.title,
        description: resGetDraftCourse?.data?.[0]?.description,
        questions: resGetDraftCourse?.data?.[0]?.questions,
      });
    }
  };

  const handleCreateCourse = async () => {
    const resCreateCourse = await createCourse(state);
    if (resCreateCourse?.EC === 0) {
      message.success("Tạo khoá học thành công!");

      const resDeleteDraftCourse = await deleteCourse();
      draftCourse.updateState({
        title: "",
        description: "",
        questions: [],
      });
    }
  };

  return (
    <Button
      onClick={handleCreateCourse}
      disabled={!title?.trim()}
      className="button-create"
      type="primary"
    >
      Tạo
    </Button>
  );
};

function HeaderCreateCourse(props) {
  return (
    <div className="header-create-course pt-5 pb-4">
      <div className="title-create">
        <span className="title">Tạo học phần mới</span>
        <span className="saved-time"></span>
      </div>
      <ButtonCreate />
    </div>
  );
}

export default HeaderCreateCourse;
