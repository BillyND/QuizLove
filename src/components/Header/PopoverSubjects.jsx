import { CaretDownOutlined, RightOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import { listContentLeft, listContentRight } from "./contans";

function PopoverSubjects(props) {
  const { locationNow, handleMoveLocation } = props;
  const [itemActive, setItemActive] = useState(0);

  const handleMouseEnterItem = (type, index) => {
    if (type === "left" && itemActive !== index) {
      setItemActive(index);
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
      <div className="popover-subjects none-copy">
        <div className="content-left">
          {listContentLeft?.map((item, index) => {
            return (
              <div
                onMouseEnter={() => handleMouseEnterItem("left", index)}
                key={`${item?.label}-${index}`}
                className={`item ${itemActive === index ? "active" : ""} `}
              >
                <span className="label">{item?.label}</span>
                <RightOutlined />
              </div>
            );
          })}
        </div>
        <div className="content-right">
          {listContentRight?.[itemActive]?.subItems?.map((item, index) => {
            const isLastItem =
              listContentRight?.[itemActive]?.subItems?.length === index + 1;

            return (
              <div
                key={`${item?.label}-${index}`}
                className={`item ${isLastItem ? "last-item" : ""}`}
              >
                {item?.label}
              </div>
            );
          })}
        </div>
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
