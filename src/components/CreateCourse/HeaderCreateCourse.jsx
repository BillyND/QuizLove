import { Button } from "antd";
import React, { useEffect } from "react";
import {
  createCourse,
  getDraftCourse,
  updateDraftCourse,
} from "../../services/api";
import { useSubscription } from "../../utils/globalStateHook";
import CreateCourse, { draftCourse } from "./CreateCourse";

let timer;

export const handlePostDraftCourse = async (dataProps) => {
  clearTimeout(timer);

  timer = setTimeout(async () => {
    if (dataProps.title !== undefined && dataProps.description !== undefined) {
      await updateDraftCourse(dataProps);
    }
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
    console.log(">>>resCreateCourse:", resCreateCourse);
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
