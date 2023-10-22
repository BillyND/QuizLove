import React, { useRef, useState } from "react";

function InputCourse(props) {
  const { placeHolder, titleMainLabel, titleSubLabel } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

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
        ref={inputRef}
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
          ok2
        </span>
      </div>
    </div>
  );
}

export default InputCourse;
