import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import useModal from "antd/es/modal/useModal";
import { useDebounce } from "../../../utils/useDebounce";
import { Checkbox } from "antd";

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

const initCheckbox = {
  allowEnrollment: true,
  invitationSent: true,
};

export const ContentFolder = (props) => {
  const {
    visibleModal,
    setEnableCreate,
    title,
    description,
    type,
    setInfoCreatePost,
  } = props;
  const [focus, setFocus] = useState(initDataFocus);
  const [infoModal, setInfoModal] = useState(initDataInfo);
  const debounceInfoModal = useDebounce(JSON.stringify(infoModal), 50);
  const firstInputRef = useRef(null);
  const [dataCheckBox, setDataCheckbox] = useState(initCheckbox);

  const debounceVisibleModal = useDebounce(visibleModal, 100);

  useEffect(() => {
    handleCheckEnableButtonCreate();
    setInfoCreatePost(JSON.parse(debounceInfoModal));
  }, [debounceInfoModal]);

  useEffect(() => {
    firstInputRef.current.focus();
    debounceVisibleModal?.active && resetData();
  }, [debounceVisibleModal]);

  const resetData = () => {
    setFocus(initDataFocus);
    setInfoModal(initDataInfo);
    setDataCheckbox(initCheckbox);
  };

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
          firstInputRef={firstInputRef}
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
          <>
            <Checkbox
              checked={dataCheckBox?.allowEnrollment}
              onChange={(e) => {
                setDataCheckbox({
                  ...dataCheckBox,
                  allowEnrollment: e.target.checked,
                });
              }}
              className="check-box-input-modal"
            >
              <span className="description">
                Cho phép các thành viên trong lớp thêm và bỏ học phần
              </span>
            </Checkbox>

            <Checkbox
              checked={dataCheckBox?.invitationSent}
              onChange={(e) => {
                setDataCheckbox({
                  ...dataCheckBox,
                  invitationSent: e.target.checked,
                });
              }}
              className="check-box-input-modal"
            >
              <span className="description">
                Cho phép các thành viên trong lớp mời thành viên mới
              </span>
            </Checkbox>
          </>
        )}

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
