import React, { useEffect } from "react";
import { windowWidth } from "../../utils/constant";
import { getDraftCourse, updateDraftCourse } from "../../services/api";
import { draftCourse } from "./CreateCourse";
import { useSubscription } from "../../utils/globalStateHook";
import { useDebounce } from "../../utils/useDebounce";
import { handleDeleteDraftCourse } from "./HeaderCreateCourse";

const handleShowPopupDraft = () => {
  const elementPopup = document.querySelector(".pop-up-left");

  setTimeout(() => {
    if (elementPopup) {
      elementPopup.style.bottom = windowWidth < 768 ? "30px" : "50px";
    }
  }, 200);
};

export const handleClosePopupDraft = () => {
  const elementPopup = document.querySelector(".pop-up-left");
  setTimeout(() => {
    if (elementPopup) {
      elementPopup.style.bottom = "-200px";
      elementPopup.style.opacity = "0";
    }
  }, 100);
};

const handleDeleteDraft = () => {
  handleDeleteDraftCourse();
  handleClosePopupDraft();
};

function PopupLeft(props) {
  const {
    state: { title, description, questions },
  } = useSubscription(draftCourse);
  const isOpenPopupLeft = !!title || !!description || !!questions?.length;

  const debounceIsOpenPopupLeft = useDebounce(isOpenPopupLeft, 300);

  useEffect(() => {
    isOpenPopupLeft && handleShowPopupDraft();
  }, [debounceIsOpenPopupLeft]);

  return (
    <div className="pop-up-left">
      <div className="title">Đây là bản nháp được tự động lưu.</div>
      <div className="button-control">
        <div className="delete-draft" onClick={handleDeleteDraft}>
          Xoá bản nháp
        </div>
        <div className="close-pop-up" onClick={handleClosePopupDraft}>
          Đóng
        </div>
      </div>
    </div>
  );
}

export default PopupLeft;
