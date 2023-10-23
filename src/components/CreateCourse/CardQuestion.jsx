import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { useDebounce } from "../../utils/useDebounce";
import { draftCourse } from "./CreateCourse";
import { handlePostDraftCourse } from "./HeaderCreateCourse";
import InputCourse from "./InputCourse";

let tempQuestions = [];

export const CardQuestion = (props) => {
  const { index } = props;
  const {
    state: { questions },
    state,
  } = useSubscription(draftCourse);
  const [questionAnswer, setQuestionAnswer] = useState(null);
  const debounceQuestionAnswer = useDebounce(questions?.[index], 100);

  useEffect(() => {
    setQuestionAnswer(questions?.[index]);
  }, [debounceQuestionAnswer]);

  const handleChangeQuestionAnswer = (type, value) => {
    setQuestionAnswer({ ...questionAnswer, [type]: value });
    let newQuestionAnswer = { ...questionAnswer, [type]: value };

    tempQuestions = questions;
    tempQuestions[index] = newQuestionAnswer;
    tempQuestions = tempQuestions?.filter((item) => {
      if (item?.question?.trim() || item?.answer?.trim()) {
        return item;
      }
    });
    const dataPost = {
      ...state,
      questions: tempQuestions,
    };

    console.log(">>>dataPost:", dataPost);
    handlePostDraftCourse(dataPost);
  };

  return (
    <div className="card-question">
      <div className="header">{index}</div>
      <Divider />
      <div className="content">
        <InputCourse
          value={questionAnswer?.question}
          type="question"
          onChange={handleChangeQuestionAnswer}
          titleMainLabel="Thuật ngữ"
          titleSubLabel="Chọn ngôn ngữ"
        />
        <InputCourse
          value={questionAnswer?.answer}
          type="answer"
          onChange={handleChangeQuestionAnswer}
          titleMainLabel="Định nghĩa"
          titleSubLabel="Chọn ngôn ngữ"
        />
      </div>
    </div>
  );
};
