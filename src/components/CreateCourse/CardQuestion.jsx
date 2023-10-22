import { Divider } from "antd";
import InputCourse from "./InputCourse";

export const CardQuestion = (props) => {
  const { index } = props;
  return (
    <div className="card-question">
      <div className="header">{index}</div>
      <Divider />
      <div className="content">
        <InputCourse titleMainLabel="Thuật ngữ" titleSubLabel="Chọn ngôn ngữ" />
        <InputCourse
          titleMainLabel="Định nghĩa"
          titleSubLabel="Chọn ngôn ngữ"
        />
      </div>
    </div>
  );
};
