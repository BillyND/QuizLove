import React, { useRef, useState } from "react";

function InputCourse(props) {
  const {
    value = "",
    type,
    placeHolder,
    titleMainLabel,
    titleSubLabel,
    onChange,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  const handleApplyChange = (value) => {
    if (typeof onChange === "function") {
      onChange(type, value);
    }
  };

  const handleFocus = () => {
    setIsFocus(true);
    inputRef.current.focus();
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleClickSubLabel = () => {};

  return (
    <div className="input-course">
      <input
        value={value}
        ref={inputRef}
        onChange={(e) => handleApplyChange(e.target.value)}
        placeholder={placeHolder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span
        className={`line-footer transition-02 ${isFocus ? "focus" : ""}`}
      ></span>

      <div className="label">
        <span className="main-label" onClick={handleFocus}>
          {titleMainLabel}
        </span>
        <span className="sub-label" onClick={handleClickSubLabel}>
          {titleSubLabel}
        </span>
      </div>
    </div>
  );
}

export default InputCourse;
