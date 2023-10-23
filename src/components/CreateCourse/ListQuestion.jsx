import { PlusOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { CardQuestion } from "./CardQuestion";
import { draftCourse } from "./CreateCourse";

export const initQuestion = [
  {
    id: "",
    question: "",
    answer: "",
    image: "",
  },
  {
    id: "",
    question: "",
    answer: "",
    image: "",
  },
  {
    id: "",
    question: "",
    answer: "",
    image: "",
  },
  {
    id: "",
    question: "",
    answer: "",
    image: "",
  },
  {
    id: "",
    question: "",
    answer: "",
    image: "",
  },
  {
    id: "",
    question: "",
    answer: "",
    image: "",
  },
];

export const minimumQuestionsSatisfied = (questions, minium) => {
  const existQuestion = questions?.filter((item) => {
    if (item?.question?.trim() || item?.answer?.trim()) {
      return item;
    }
  });

  const enableDelete = existQuestion?.length > minium;

  return enableDelete;
};

export const ListQuestion = () => {
  const {
    state: { questions },
    state,
  } = useSubscription(draftCourse);
  const [listQuestion, setListQuestion] = useState(questions || initQuestion);

  const enableDelete = minimumQuestionsSatisfied(listQuestion, 2);

  useEffect(() => {
    setListQuestion(questions);
  }, [questions]);

  const handleAddNewQuestion = () => {
    setListQuestion(
      listQuestion ? [...listQuestion, initQuestion?.[0]] : [initQuestion?.[0]]
    );
  };

  return (
    <div className="question-create-course pt-4">
      {listQuestion?.map((question, index) => {
        return (
          <Fragment key={`${question?.id}-${index}`}>
            <CardQuestion
              state={state}
              listQuestion={listQuestion}
              question={question}
              index={index}
              enableDelete={enableDelete}
              setListQuestion={setListQuestion}
            />
          </Fragment>
        );
      })}
      <div className="card-question card-add-new-question flex-center-all">
        <div className="content-add-question" onClick={handleAddNewQuestion}>
          <PlusOutlined /> THÊM THẺ
          <span className="footer-line"></span>
        </div>
      </div>
    </div>
  );
};
