/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDebounce } from "../../../utils/useDebounce";

function Input(props) {
  const {
    label,
    value,
    onChange,
    type,
    placeHolder,
    setFocus,
    focus,
    className,
    visibleModal,
    firstInputRef,
  } = props;

  const handleFocus = (isFocus) => {
    setFocus({ ...focus, [type]: isFocus });
  };
  const [localValue, setLocalValue] = useState(value[type]);
  const debounceLocalValue = useDebounce(localValue, 50);

  useEffect(() => {
    setLocalValue("");
  }, [visibleModal]);

  useEffect(() => {
    onChange({ ...value, [type]: localValue });
  }, [debounceLocalValue]);

  return (
    <label className="label-input-modal">
      <span className="label">{label}</span>
      <input
        ref={firstInputRef}
        className={`input ${className}`}
        placeholder={placeHolder}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      />
      <span
        className="line-footer"
        style={{
          display: focus[type] ? "block" : "",
        }}
      ></span>
    </label>
  );
}

export default Input;
