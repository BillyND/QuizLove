import React from "react";
import { toggleAuthModalSubs } from "../Header/Header";

const BannerHomeGuest = () => (
  <div className="parent-banner">
    <div className="banner">
      <div className="banner-content">
        <h1 className="content-header">
          Thẻ ghi nhớ kỹ thuật số và các công cụ học tốt nhất
        </h1>

        <p className="content-paragraph">
          Tham gia cùng hơn 60 triệu học sinh đang sử dụng các thẻ ghi nhớ dựa
          trên nền tảng khoa học, các bài kiểm tra thử và lời giải chuyên gia
          của Quizlet để cải thiện điểm số và đạt được mục tiêu.
        </p>

        <button
          className="cursor-pointer transition-02 remove-style-button button-register-banner"
          onClick={() => toggleAuthModalSubs.updateState({ type: "register" })}
        >
          Đăng ký miến phí
        </button>
      </div>
    </div>
  </div>
);

function HomeGuest(props) {
  return (
    <div className="home-guest">
      <BannerHomeGuest />
    </div>
  );
}

export default HomeGuest;
