import React, { useState } from "react";

import { DOWN_BUTTON_IMAGE } from "@/Utils/images";
import styles from "./Select.module.scss";

const Select = ({ lable, optionLable, data, onSelect, value }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleLableClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSelect = (val) => {
    if (val !== value) {
      onSelect(val);
      setShowOptions(false);
    }
  };

  return (
    <div className={styles.selectWrapper}>
      <div className={styles.lableWrapper} onClick={handleLableClick}>
        {lable}&nbsp;{DOWN_BUTTON_IMAGE}
      </div>
      {showOptions && (
        <div className={styles.overlay}>
          <div className={styles.optionsWrapper}>
            <div className={styles.optionLable}>
              {optionLable ?? `Select ${lable?.toLowerCase()}`}{" "}
              <span onClick={handleLableClick}>&#10005;</span>
            </div>
            {data?.map((option, index) => {
              return (
                <div
                  key={`${lable}-option-${index}`}
                  onClick={(e) => {
                    handleSelect(option.value);
                  }}
                >
                  <span>{option?.value === value && <>&#10003;</>}</span>
                  {option?.lable}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
