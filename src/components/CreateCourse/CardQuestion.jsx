import { DeleteOutlined } from "@ant-design/icons";
import { Divider, Tooltip } from "antd";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { handlePostDraftCourse } from "./HeaderCreateCourse";
import InputCourse from "./InputCourse";

let tempQuestions = [];

export const CardQuestion = (props) => {
  const {
    index,
    state,
    enableDelete,
    question,
    setListQuestion,
    listQuestion,
  } = props;
  const [questionAnswer, setQuestionAnswer] = useState(question);
  const debounceQuestion = useDebounce(JSON.stringify(question), 10);

  useEffect(() => {
    setQuestionAnswer(question);
  }, [debounceQuestion]);

  const handleChangeQuestionAnswer = (type, value) => {
    setQuestionAnswer({ ...questionAnswer, [type]: value });
    let newQuestionAnswer = { ...questionAnswer, [type]: value };

    tempQuestions = listQuestion;
    tempQuestions[index] = newQuestionAnswer;

    const dataPost = {
      ...state,
      questions: tempQuestions,
    };

    handlePostDraftCourse(dataPost, false);
  };

  const handleDeleteQuestion = (index) => {
    if (!enableDelete) return;

    const cloneQuestion = cloneDeep(listQuestion)?.filter(
      (item, idx) => idx !== index
    );

    const dataPost = {
      ...state,
      questions: cloneQuestion,
    };

    setListQuestion(cloneQuestion);

    handlePostDraftCourse(dataPost, false);
  };

  return (
    <div className="card-question">
      <div className="header d-flex justify-content-between align-items-center">
        {index + 1}

        <div
          className={`remove-style-button icon-control`}
          onClick={() => handleDeleteQuestion(index)}
        >
          <Tooltip placement="bottom" title={"Xoá thẻ này"}>
            <DeleteOutlined
              className={`icon-delete ${
                !enableDelete ? "disabled-button" : ""
              }`}
            />
          </Tooltip>
        </div>
      </div>
      <Divider />
      <div className="content">
        <InputCourse
          value={questionAnswer?.question || ""}
          type="question"
          onChange={handleChangeQuestionAnswer}
          titleMainLabel="Thuật ngữ"
          titleSubLabel="Chọn ngôn ngữ"
        />
        <InputCourse
          value={questionAnswer?.answer || ""}
          type="answer"
          onChange={handleChangeQuestionAnswer}
          titleMainLabel="Định nghĩa"
          titleSubLabel="Chọn ngôn ngữ"
        />
      </div>
    </div>
  );
};
