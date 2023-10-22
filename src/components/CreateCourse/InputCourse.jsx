import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { draftCourse } from "./CreateCourse";

function InputCourse(props) {
  const { type, placeHolder, titleMainLabel, titleSubLabel } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);
  const [localValue, setLocalValue] = useState(draftCourse?.state[type]);
  const debounceLocalValue = useDebounce(localValue, 100);

  useEffect(() => {
    handleApplyChange();
  }, [debounceLocalValue]);

  const handleApplyChange = () => {
    draftCourse.updateState({
      ...draftCourse?.state,
      [type]: localValue,
    });
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
        value={localValue}
        ref={inputRef}
        onChange={(e) => setLocalValue(e.target.value)}
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
