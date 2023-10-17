import { useEffect, useState } from "react";
import Input from "./Input";
import useModal from "antd/es/modal/useModal";
import { useDebounce } from "../../../utils/useDebounce";

const initDataFocus = {
  name: false,
  description: false,
  class: false,
};

const initDataInfo = {
  name: "",
  description: "",
  class: "",
};

export const ContentFolder = (props) => {
  const { visibleModal, setEnableCreate, title, description, type } = props;
  const [focus, setFocus] = useState(initDataFocus);
  const [infoModal, setInfoModal] = useState(initDataInfo);
  const debounceInfoModal = useDebounce(JSON.stringify(infoModal), 50);

  useEffect(() => {
    handleCheckEnableButtonCreate();
  }, [debounceInfoModal]);

  const handleCheckEnableButtonCreate = () => {
    if (
      infoModal?.name ||
      (type === "class" && infoModal?.class && infoModal?.name)
    ) {
      setEnableCreate(true);
    } else {
      setEnableCreate(false);
    }
  };

  return (
    <div className="content-course">
      <span className="title">{title}</span>
      <span className="description">{description}</span>
      <div className="content">
        <Input
          {...props}
          visibleModal={visibleModal}
          label={type === "class" ? "Tên lớp" : "Tiêu đề"}
          className={infoModal?.name?.length ? "small" : ""}
          value={infoModal}
          focus={focus}
          placeHolder={
            type === "class"
              ? "Nhập tên lớp (khoá học, giáo viên, năm nay, phần vv)"
              : "Nhập tiêu đề"
          }
          setFocus={setFocus}
          type={"name"}
          onChange={setInfoModal}
        />
        <Input
          {...props}
          visibleModal={visibleModal}
          label={"Mô tả (tuỳ chọn)"}
          className={infoModal?.description?.length ? "small" : ""}
          value={infoModal}
          focus={focus}
          placeHolder={"Nhập mô tả (tuỳ chọn)"}
          setFocus={setFocus}
          type={"description"}
          onChange={setInfoModal}
        />
        {type === "class" && (
          <Input
            {...props}
            visibleModal={visibleModal}
            label={"Tên trường"}
            className={infoModal?.class?.length ? "small" : ""}
            value={infoModal}
            focus={focus}
            placeHolder={"Nhập tên trường của bạn"}
            setFocus={setFocus}
            type={"class"}
            onChange={setInfoModal}
          />
        )}
      </div>
    </div>
  );
};
