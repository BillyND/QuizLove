import { CaretDownOutlined, RightOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";

const listContentLeft = [
  {
    icon: "",
    label: "Bài thi",
  },
  {
    icon: "",
    label: "Nghệ thuật và nhân văn",
  },
  {
    icon: "",
    label: "Ngôn ngữ",
  },
  {
    icon: "",
    label: "Toán học",
  },
  {
    icon: "",
    label: "Khoa học",
  },
  {
    icon: "",
    label: "Khoa học xã hội",
  },
];

function PopoverSubjects(props) {
  const { locationNow, handleMoveLocation } = props;
  const [itemLeftActive, setItemLeftActive] = useState(0);

  const handleMouseEnterItem = (type, index) => {
    if (type === "left" && itemLeftActive !== index) {
      setItemLeftActive(index);
    }
  };

  const activator = (
    <button className="item cursor-pointer remove-style-button">
      <div className="text">
        Chủ đề
        <CaretDownOutlined />
        <span
          className="line-footer-nav"
          style={{
            opacity: locationNow?.pathname?.includes("/subjects") ? "1" : "",
          }}
        />
      </div>
    </button>
  );

  const ContentPopoverSubjects = () => {
    return (
      <div className="popover-subjects">
        <div className="content-left">
          {listContentLeft?.map((item, index) => {
            return (
              <div
                onMouseEnter={() => handleMouseEnterItem("left", index)}
                key={`${item?.label}-${index}`}
                className={`item ${itemLeftActive === index ? "active" : ""}`}
              >
                <span className="label">{item?.label}</span>
                <RightOutlined />
              </div>
            );
          })}
        </div>
        <div className="content-right"></div>
      </div>
    );
  };

  return (
    <Popover
      placement="topLeft"
      content={<ContentPopoverSubjects />}
      trigger="click"
    >
      {activator}
    </Popover>
  );
}

export default PopoverSubjects;
