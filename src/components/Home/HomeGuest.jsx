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
          Đăng ký miễn phí
        </button>
      </div>
    </div>
  </div>
);

const PercentStudent = () => {
  return (
    <section className="container percent-student">
      <span className="center">
        90% học sinh sử dụng Quizlet cho biết họ đã cải thiện được điểm số.
      </span>
    </section>
  );
};

const BannerMemory = () => {
  return (
    <div className="banner-memory">
      <div className="banner-memory-left">
        <h2 className="h1oedsu4">Ghi nhớ nhanh hơn, miễn phí</h2>
        <p className="p1b46reu">
          Nghiên cứu cho thấy việc tự kiểm tra bằng thẻ ghi nhớ sẽ hiệu quả hơn
          việc đọc lại ghi chú của bạn. Từ toán học, y học đến ngôn ngữ hiện
          đại, Quizlet được học sinh sử dụng trong hơn 100 chủ đề khác nhau.
        </p>
        <button
          className="remove-style-button button-register-banner cursor-pointer"
          onClick={() => toggleAuthModalSubs.updateState({ type: "register" })}
        >
          Bắt đầu
        </button>
      </div>

      <div className="banner-memory-right">
        <img src="https://images.prismic.io/quizlet-web/MDFkMjA3YzUtMGQyNC00ZDU3LThmMDctZjljZjQ5OTg2N2M0_130dc509-6919-47bc-b27d-17f600a41b0c_intlfirstslice.png?auto=compress,format&amp;rect=0,0,1000,683&amp;w=1000&amp;h=683" />
      </div>
    </div>
  );
};

function HomeGuest(props) {
  return (
    <div className="home-guest">
      <BannerHomeGuest />
      <PercentStudent />
      <BannerMemory />
    </div>
  );
}

export default HomeGuest;
