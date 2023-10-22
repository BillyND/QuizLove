import { Fragment } from "react";
import { CardQuestion } from "./CardQuestion";

export const initQuestion = [
  {
    id: "",
    terms: "",
    define: "",
    image: "",
  },
];

export const ListQuestion = () => {
  return (
    <div className="question-create-course pt-4">
      {initQuestion?.map((question, index) => {
        return (
          <Fragment key={`${question?.id}-${index}`}>
            <CardQuestion index={index + 1} />
          </Fragment>
        );
      })}
    </div>
  );
};
