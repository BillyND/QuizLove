import { useEffect, useState } from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { useDebounce } from "../../utils/useDebounce";
import { draftCourse } from "./CreateCourse";
import "./CreateCourse.scss";
import { handlePostDraftCourse } from "./HeaderCreateCourse";
import InputCourse from "./InputCourse";

function TitleDescriptionCourse() {
  const {
    state: { title, description },
    state,
  } = useSubscription(draftCourse);

  const [titleDescription, setTitleDescription] = useState(null);
  const debounceTitleDescription = useDebounce(
    JSON.stringify(title + description),
    100
  );

  useEffect(() => {
    setTitleDescription({ title, description });
  }, [debounceTitleDescription]);

  const handleChangeTitleDescription = (type, value) => {
    setTitleDescription({ ...titleDescription, [type]: value || "" });

    let newTitleDescription = { ...titleDescription, [type]: value || "" };

    const dataPost = {
      ...state,
      ...newTitleDescription,
    };

    handlePostDraftCourse(dataPost);
  };
  return (
    <div className="input-info-course">
      <InputCourse
        onChange={handleChangeTitleDescription}
        value={titleDescription?.title}
        type={"title"}
        titleMainLabel="Tiêu đề"
        placeHolder={'Nhập tiêu đề, ví dụ: "Sinh học- Chương 22: Tiến hoá"'}
      />
      <InputCourse
        onChange={handleChangeTitleDescription}
        value={titleDescription?.description}
        type={"description"}
        titleMainLabel="Mô tả"
        placeHolder={"Thêm mô tả"}
      />
    </div>
  );
}

export default TitleDescriptionCourse;
