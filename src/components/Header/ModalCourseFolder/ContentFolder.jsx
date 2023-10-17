import { useEffect, useState } from "react";
import Input from "./Input";
import useModal from "antd/es/modal/useModal";

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
  const { visibleModal } = props;
  const [focus, setFocus] = useState(initDataFocus);

  const [infoModal, setInfoModal] = useState(initDataInfo);

  return (
    <div className="content-course">
      <span className="title">Tạo thư mục mới</span>
      <div className="content">
        <Input
          visibleModal={visibleModal}
          label={"Tiêu đề"}
          className={infoModal?.name?.length ? "small" : ""}
          value={infoModal}
          focus={focus}
          placeHolder={"Nhập tiêu đề"}
          setFocus={setFocus}
          type={"name"}
          onChange={setInfoModal}
        />
        <Input
          visibleModal={visibleModal}
          label={"Mô tả"}
          className={infoModal?.description?.length ? "small" : ""}
          value={infoModal}
          focus={focus}
          placeHolder={"Nhập mô tả (tuỳ chọn)"}
          setFocus={setFocus}
          type={"description"}
          onChange={setInfoModal}
        />
      </div>
    </div>
  );
};
