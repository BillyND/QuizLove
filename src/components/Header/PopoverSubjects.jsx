import { CaretDownOutlined, RightOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import { listContentLeft, listContentRight } from "./contans";

function PopoverSubjects(props) {
  const { locationNow, handleMoveLocation } = props;
  const [itemActive, setItemActive] = useState({
    left: 0,
    eight: 0,
  });

  const handleMouseEnterItem = (type, index) => {
    if (type === "left" && itemActive?.left !== index) {
      setItemActive({
        right: -1,
        left: index,
      });
    } else if (type === "right" && itemActive?.right !== index) {
      setItemActive({
        ...itemActive,
        right: index,
      });
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
                className={`item ${
                  itemActive?.left === index ? "active" : ""
                } `}
              >
                <span className="label">{item?.label}</span>
                <RightOutlined />
              </div>
            );
          })}
        </div>
        <div className="content-right">
          {listContentRight?.[itemActive?.left]?.subItems?.map(
            (item, index) => {
              const isLastItem =
                listContentRight?.[itemActive?.left]?.subItems?.length ===
                index + 1;

              return (
                <div
                  onMouseEnter={() => handleMouseEnterItem("right", index)}
                  key={`${item?.label}-${index}`}
                  className={`item ${isLastItem ? "last-item" : ""}`}
                >
                  {item?.label}
                </div>
              );
            }
          )}
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
