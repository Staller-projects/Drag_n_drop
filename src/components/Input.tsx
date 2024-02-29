import React, { useState } from "react";
import { Tooltip } from "@mui/material";

interface InputProps {
  placeHolder: string;
  onEnter(value: string, date: string): void;
  showValidationAlert(message: string): void;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState("");
  const setValueOfTitleInputOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (!currentInputValue || !dateInputValue) {
        props.showValidationAlert("Both Fields are Compulsory!");
        return;
      }
      setCurrentInputValue("");
      setDateInputValue("");
      return props.onEnter(currentInputValue, dateInputValue);
    }
  };

  return (
    <div className="flex w-full mb-1">
      <Tooltip title="Add the title for your to-do" placement="bottom">
        <input
          value={currentInputValue}
          onKeyDown={setValueOfTitleInputOnEnter}
          onChange={(e) => setCurrentInputValue(e.target.value)}
          type="text"
          className="py-2.5 px-2 block w-full font-semibold font-mono border-gray-200 rounded-md placeholder-slate-300 outline-none text-sm dark:text-white text-black disabled:opacity-50 disabled:pointer-events-none bg-primary/40 "
          placeholder={props.placeHolder}
        />
      </Tooltip>
      <div className="border-r-2 border-gray-500 my-2"></div>
      <Tooltip title="You Can Add the Deadline for the task" placement="bottom">
        <input
          value={dateInputValue}
          onKeyDown={setValueOfTitleInputOnEnter}
          onChange={(e) => setDateInputValue(e.target.value)}
          type="date"
          placeholder="ldal"
          min={new Date().toISOString().split("T")[0]}
          className="date-input py-2.5 px-2 block hover:cursor-pointer w-2/4 font-semibold font-mono !placeholder-red-600 border-gray-200 outline-none rounded-md text-sm dark:text-white text-black disabled:opacity-50 disabled:pointer-events-none bg-primary/40  "
        />
      </Tooltip>
    </div>
  );
};

export default Input;
