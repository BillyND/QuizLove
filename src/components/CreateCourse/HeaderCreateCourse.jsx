import { Button, message } from "antd";
import React, { useState } from "react";
import {
  createCourse,
  deleteCourse,
  updateDraftCourse,
} from "../../services/api";
import { useSubscription } from "../../utils/globalStateHook";
import { draftCourse } from "./CreateCourse";
import { minimumQuestionsSatisfied } from "./ListQuestion";

let timerPost;

export const handlePostDraftCourse = async (dataPost, isDeleteQuestion) => {
  clearTimeout(timerPost);

  timerPost = setTimeout(async () => {
    !isDeleteQuestion && draftCourse.updateState(dataPost);
    await updateDraftCourse(dataPost);
  }, 300);
};

export const handleDeleteDraftCourse = () => {
  console.log(">>>here");
  draftCourse.updateState({
    title: "",
    description: "",
    questions: [],
  });
  deleteCourse();
};

const ButtonCreate = () => {
  const {
    state: { title },
    state,
    setState,
  } = useSubscription(draftCourse);
  const [loading, setLoading] = useState();

  const handleCreateCourse = async () => {
    try {
      const isSatisfiedQuestions = minimumQuestionsSatisfied(
        state?.questions,
        1
      );

      if (!isSatisfiedQuestions) {
        message.error("Tối thiểu 2 câu hỏi!");
        return;
      }

      setLoading(true);

      const resCreateCourse = await createCourse(state);
      if (resCreateCourse?.EC === 0) {
        handleDeleteDraftCourse();
        message.success("Tạo khoá học thành công!");

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      onClick={handleCreateCourse}
      disabled={!title?.trim()}
      className="button-create"
      type="primary"
    >
      {!loading && "Tạo"}
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
