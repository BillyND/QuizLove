import React, { useEffect } from "react";
import { windowWidth } from "../../utils/constant";

function PopupLeft(props) {
  useEffect(() => {
    handleShowPopup();
  }, []);
  const handleShowPopup = () => {
    const elementPopup = document.querySelector(".pop-up-left");

    setTimeout(() => {
      if (elementPopup) {
        elementPopup.style.bottom = windowWidth < 768 ? "30px" : "50px";
      }
    }, 100);
  };

  const handleClosePopup = () => {
    const elementPopup = document.querySelector(".pop-up-left");
    setTimeout(() => {
      if (elementPopup) {
        elementPopup.style.bottom = "-200px";
        elementPopup.style.opacity = "0";
      }
    }, 100);
  };

  return (
    <div className="pop-up-left">
      <div className="title">Đây là bản nháp được tự động lưu.</div>
      <div className="button-control">
        <div className="delete-draft">Xoá bản nháp</div>
        <div className="close-pop-up" onClick={handleClosePopup}>
          Đóng
        </div>
      </div>
    </div>
  );
}

export default PopupLeft;
